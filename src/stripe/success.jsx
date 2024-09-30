import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchFromApi } from "../utils/helpers/stripe";

function Success() {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionIdFromQS = queryParams.get("session_id");
    setSessionId(sessionIdFromQS);
    if (sessionIdFromQS) {
      fetchFromApi("/order/payment-date", {
        method: "put",
        body: { sessionId: sessionIdFromQS },
      }).then((data) => setResult(data));
      console.log(result);
    }
  }, []);

  return (
    <div>
      Success
      <pre>
        
      {JSON.stringify(result, null, 2)}
    </pre>
    </div>
  );
}

export default Success;
