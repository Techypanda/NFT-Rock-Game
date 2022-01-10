import { createContext, useContext, useEffect } from "react";
import { getTokens, saveTokens } from "./api";
import requestHandler from "./requestHandler";

export const RContext = createContext({
  authenticated: false,
  setAuthenticated: (state: boolean) => { },
  pageLoading: false,
  setPageLoading: (state: boolean) => { },
})

export function useAuthStatus() {
  const { authenticated, setAuthenticated } = useContext(RContext)
  return { authenticated, setAuthenticated }
}

export function usePageLoader() {
  const { pageLoading, setPageLoading } = useContext(RContext)
  return { pageLoading, setPageLoading }
}