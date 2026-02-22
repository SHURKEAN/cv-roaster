document.addEventListener("DOMContentLoaded", () => {
  // PDF.js worker setup (safe)
  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  } else {
    console.error("pdfjsLib not loaded — check your pdf.js script tag");
  }

  // Roast button
  document.getElementById("roastBtn").addEventListener("click", async () => {
    const cvText = document.getElementById("cvInput").value;
    const tone = document.getElementById("toneSelect").value;

    if (!cvText || !tone) {
      alert("Please paste your CV and select a tone first!");
      return;
    }

    const roastBtn = document.getElementById("roastBtn");
    roastBtn.innerText = "Roasting... 🔥";
    roastBtn.disabled = true;

    try {
      const response = await fetch("http://localhost:3000/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, tone }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      document.getElementById("roastText").innerText = data.roast;
      document.getElementById("fixesList").innerHTML = data.fixes
        .map((f) => `<li>${f}</li>`)
        .join("");

      document.getElementById("results").classList.remove("hidden");
    } catch (error) {
      console.error("Error:", error);
      alert("Make sure your backend server is running (node server.js)");
    } finally {
      roastBtn.innerText = "Roast my CV";
      roastBtn.disabled = false;
    }
  });

  // Upload button triggers file input
  document.getElementById("uploadTrigger").addEventListener("click", () => {
    document.getElementById("cvFile").click();
  });

  // Handle file selection (PDF + TXT)
  document.getElementById("cvFile").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const fileNameDisplay = document.getElementById("fileName");
    const textArea = document.getElementById("cvInput");

    if (!file) return;

    fileNameDisplay.innerText = file.name;
    textArea.value = "Reading file... please wait.";

    if (file.type === "application/pdf") {
      if (!window.pdfjsLib) {
        textArea.value = "PDF reader not loaded. Refresh the page.";
        return;
      }

      const reader = new FileReader();
      reader.onload = async function () {
        try {
          const typedarray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;

          let fullText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str).join(" ");
            fullText += pageText + "\n";
          }

          textArea.value = fullText;
        } catch (err) {
          console.error(err);
          textArea.value = "Failed to read PDF. Try another PDF or copy/paste text.";
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => (textArea.value = event.target.result);
      reader.readAsText(file);
    }
  });
});