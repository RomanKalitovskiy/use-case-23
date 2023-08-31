import { generateData } from "./generateData";

function App() {
  return <button onClick={click}>Generate Data</button>;
}

function click(e) {
  e.preventDefault();
  const [titles, credits] = generateData();

  downloadFile(createCSV(titles), "titles.csv");
  downloadFile(createCSV(credits), "credits.csv");
}

function downloadFile(blob, fileName) {
  const a = window.document.createElement("a");
  a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function createCSV(rows) {
  let csvContent = rows.map((e) => e.join(",")).join("\n");
  return new Blob([csvContent]);
}

export default App;
