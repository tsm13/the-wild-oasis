import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children: ReactNode;
}

export default function LoginGuard({ children }: Props) {
  const navigate = useNavigate();

  const { isLoading, isFetching, fetchStatus, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
      navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  if (isAuthenticated) return children;
}
