import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

async function Success() {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionIdFromQS = queryParams.get("session_id");
    setSessionId(sessionIdFromQS);
    if (sessionIdFromQS) {
      fetchFromApi("/order/payment-date", {
        body: { sessionId: sessionIdFromQS },
      }).then((data) => setResult(data));
      console.log(result);
    }
  });

  return <div>Success</div>;
}

export default Success;
