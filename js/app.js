document.getElementById("roastBtn").addEventListener("click", function () {
  const cvText = document.getElementById("cvInput").value;
  const tone = document.getElementById("toneSelect").value;

  if (!cvText || !tone) {
    alert("Please paste your CV and select a tone first!");
    return;
  }

  // This is where you would usually call an AI API.
  // For now, let's generate a fun placeholder roast.
  generateRoast(tone);
});

function generateRoast(tone) {
  document.getElementById("roastBtn").addEventListener("click", function () {
    const cvInput = document.getElementById("cvInput");
    const toneSelect = document.getElementById("toneSelect");

    const text = cvInput.value.trim();
    const tone = toneSelect.value;

    if (!text || !tone) {
      alert("Please provide CV text and select a tone!");
      return;
    }

    const roastBox = document.getElementById("roastText");
    const fixesBox = document.getElementById("fixesList");
    const resultsArea = document.getElementById("results");

    resultsArea.classList.remove("hidden");

    let roastContent = "";
    let suggestedFixes = [];

    // --- LOGIC CHECKS ---
    const textLower = text.toLowerCase();
    const hasLorem = textLower.includes("lorem") || textLower.includes("ipsum");
    const hasNoNumbers = !/\d/.test(text); // Checks if there are ANY digits 0-9
    const isTooShort = text.length < 200; // Threshold for a "short" CV

    // --- 1. THE MAIN ROAST ---
    if (hasLorem) {
      roastContent =
        "🚩 RED FLAG: You left 'Lorem Ipsum' in your CV. This tells recruiters you're great at copying templates but terrible at actually reading your own work.";
      suggestedFixes.push("Remove all placeholder text immediately.");
    } else if (isTooShort) {
      roastContent =
        "This isn't a CV, it's a haiku. You've given me so little information that I have to assume your only professional skill is 'existing'.";
      suggestedFixes.push(
        "Expand your experience sections with actual responsibilities.",
      );
    } else {
      // Standard Roasts based on Tone
      if (tone === "gentle") {
        roastContent =
          "It's a nice start, but it's very 'safe'. You're hiding your achievements behind a wall of corporate-speak.";
      } else if (tone === "spicy") {
        roastContent =
          "This reads like a list of chores. It's functional, but it has zero personality. I'm bored just looking at it.";
      } else if (tone === "savage") {
        roastContent =
          "I've seen more professional ambition in a 'Gone Fishing' sign. This CV is where dreams go to die.";
      }
    }

    // --- 2. THE METRIC CHECK (Added to any roast) ---
    if (hasNoNumbers && !hasLorem && !isTooShort) {
      roastContent +=
        " Also, where are the numbers? You 'managed projects'? How many? Without metrics (%, $, numbers), your claims are just opinions.";
      suggestedFixes.push(
        "Add quantifiable metrics (e.g., 'Improved efficiency by 20%' or 'Managed $10k budget').",
      );
    }

    // --- 3. FINAL FIXES ---
    if (suggestedFixes.length === 0) {
      suggestedFixes = [
        "Use stronger action verbs",
        "Tailor your summary to a specific role",
      ];
    }

    // Inject results into UI
    roastBox.innerText = roastContent;
    fixesBox.innerHTML = suggestedFixes.map((f) => `<li>${f}</li>`).join("");

    resultsArea.scrollIntoView({ behavior: "smooth" });
  });
}

// Handle file upload
// Trigger the hidden file input when the custom button is clicked
document.getElementById("uploadTrigger").addEventListener("click", function () {
  document.getElementById("cvFile").click();
});

// Handle the file selection
document.getElementById("cvFile").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const fileNameDisplay = document.getElementById("fileName");
  const textArea = document.getElementById("cvInput");

  if (file) {
    fileNameDisplay.innerText = file.name;

    // Use FileReader to read the text content of the file
    const reader = new FileReader();
    reader.onload = function (event) {
      textArea.value = event.target.result;
    };

    // This works for .txt and basic code files
    reader.readAsText(file);
  } else {
    fileNameDisplay.innerText = "No file chosen";
  }
});

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

document.getElementById("uploadTrigger").addEventListener("click", () => {
  document.getElementById("cvFile").click();
});

document
  .getElementById("cvFile")
  .addEventListener("change", async function (e) {
    const file = e.target.files[0];
    const fileNameDisplay = document.getElementById("fileName");
    const textArea = document.getElementById("cvInput");

    if (!file) return;

    fileNameDisplay.innerText = file.name;
    textArea.value = "Reading file... please wait.";

    if (file.type === "application/pdf") {
      // --- PDF EXTRACTION LOGIC ---
      const reader = new FileReader();
      reader.onload = async function () {
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
      };
      reader.readAsArrayBuffer(file);
    } else {
      // --- NORMAL TEXT EXTRACTION ---
      const reader = new FileReader();
      reader.onload = (event) => (textArea.value = event.target.result);
      reader.readAsText(file);
    }
  });
