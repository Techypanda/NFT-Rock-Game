import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { RContext } from "../../api/hooks"
import { doRefresh } from "../../api/api"
import { useEffect } from "react";

function RockContext(props: DefaultProps) {
  const { children } = props
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recieveLoot, setRecieveLoot] = useState(true);
  const [money, setMoney] = useState(0);
  const [moneyPS, setMoneyPS] = useState(0);
  async function authLoop() {
    try {
      await doRefresh()
      setAuthenticated(true);
      setTimeout(() => {
        authLoop()
      }, 600000)
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    authLoop()
  }, [])
  return (
    <RContext.Provider value={{
      authenticated: isAuthenticated,
      setAuthenticated: setAuthenticated,
      pageLoading: loading,
      setPageLoading: setLoading,
      recieveLoot: recieveLoot,
      setRecieveLoot: setRecieveLoot,
      money: money,
      setMoney: setMoney,
      moneyPerSecond: moneyPS,
      setMoneyPerSecond: setMoneyPS
    }}>
      {!loading ? <>
        {children}
      </> : <CircularProgress />
      }
    </RContext.Provider>
  )
}
export default RockContext