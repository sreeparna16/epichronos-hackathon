import { useState } from "react";
import { predictPatient } from "../services/api";

function Analyze() {
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    const payload = {
      RASSF1A_pct: 12,
      SEPT9_pct: 8,
      APC_pct: 5,
      SFRP1_pct: 7,
      LINE1_pct: 60,
      miR21_FC: 2.1,
      miR34a_FC: 1.3,
      miR155_FC: 2.5,
      miR122_FC: 0.8,
      EpiProxy: 1.2,
      G: 1,
      age: 45
    };

    try {
      const data = await predictPatient(payload);
      setResult(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>EpiChronos Working</h1>

      <button onClick={handlePredict}>
        Predict Risk
      </button>

      {result && (
        <div>
          <p>Score: {result.risk_score}</p>
          <p>Level: {result.risk_level}</p>
        </div>
      )}
    </div>
  );
}

export default Analyze;