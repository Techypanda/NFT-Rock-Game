import { createContext, useContext, useEffect } from "react";
import { getTokens, saveTokens } from "./api";
import requestHandler from "./requestHandler";

export const RContext = createContext({
  authenticated: false,
  setAuthenticated: (state: boolean) => { },
  pageLoading: false,
  setPageLoading: (state: boolean) => { },
  recieveLoot: false,
  setRecieveLoot: (state: boolean) => { },
  money: 0,
  setMoney: (money: number) => { },
  moneyPerSecond: 0,
  setMoneyPerSecond: (moneyPerSecond: number) => { }
})

export function useAuthStatus() {
  const { authenticated, setAuthenticated } = useContext(RContext)
  return { authenticated, setAuthenticated }
}

export function usePageLoader() {
  const { pageLoading, setPageLoading } = useContext(RContext)
  return { pageLoading, setPageLoading }
}

export function useLoot() {
  const { recieveLoot, setRecieveLoot } = useContext(RContext);
  return { recieveLoot, setRecieveLoot }
}

export function useMoney() {
  const { money, setMoney, moneyPerSecond, setMoneyPerSecond } = useContext(RContext);
  return { money, setMoney, moneyPerSecond, setMoneyPerSecond }
}