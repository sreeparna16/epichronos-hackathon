import { useState } from "react";
import { predictPatient } from "../services/api";

function Analyze() {
  const [form, setForm] = useState({
    RASSF1A_pct: "",
    SEPT9_pct: "",
    APC_pct: "",
    SFRP1_pct: "",
    LINE1_pct: "",
    miR21_FC: "",
    miR34a_FC: "",
    miR155_FC: "",
    miR122_FC: "",
    EpiProxy: "",
    G: "",
    age: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const data = await predictPatient(form);
      setResult(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl text-blue-500">EPICHRONOS PREDICTION</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 
                 focus:outline-none focus:ring-2 
                 focus:ring-blue-500"
          />
        ))}
      </div>

      <button
        onClick={handlePredict}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Predict Risk"}
      </button>

      {
        result && (
          <div style={{ marginTop: 30 }}>
            <h2>Risk Score: {result.risk_score.toFixed(3)}</h2>
            <h2>Risk Level: {result.risk_level}</h2>

            {result.epigenetic_age && (
              <h3>Epigenetic Age: {result.epigenetic_age.toFixed(2)}</h3>
            )}

            <h3>Top Biomarkers</h3>
            <ul>
              {result.top_biomarkers.map((b, i) => (
                <li key={i}>
                  {b.feature} — {b.importance.toFixed(3)}
                </li>
              ))}
            </ul>
          </div>
        )
      }
    </div >
  );
}

export default Analyze;