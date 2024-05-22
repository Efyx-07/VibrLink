// test for the buttons of the Hero component

import { render,screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Hero from "../components/home-page/Hero";
import SignupPage from "../pages/SignupPage"; 
import LoginPage from "../pages/LoginPage";
import NewLinkPage from "../pages/NewLinkPage";
import { useUserStore } from "../stores";

describe("Hero component", () => {
    
    // test the button to navigate to the signup page
    it("should navigate to '/signup' when 'Create a free account' button is clicked", async (): Promise <void> => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes> 
                    <Route path="/" element={<Hero />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </MemoryRouter>
        );
        userEvent.click(screen.getByText("Create a free account"));
        await waitFor(() => expect(screen.getByText("Create a free account")).toBeInTheDocument());
    });

    // test the button to navigate to the login page
    it("should navigate to '/login' when 'Sign in' button is clicked", async (): Promise <void> => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes> 
                    <Route path="/" element={<Hero />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </MemoryRouter>
        );
        userEvent.click(screen.getByText("Sign in"));
        await waitFor(() => expect(screen.getByText("Happy")).toBeInTheDocument());
    });

    // test the button to navigate to the signup page
    it("should navigate to '/new-vibrlink' when 'Create a new vibrLink' button is clicked", async (): Promise <void> => {
        // mock the store for the conditionnal display of this button
        useUserStore.setState({ isLoggedIn: true });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes> 
                    <Route path="/" element={<Hero />} />
                    <Route path="/new-vibrlink" element={<NewLinkPage />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getByText("Create a new vibrLink")).toBeInTheDocument());

        userEvent.click(screen.getByText("Create a new vibrLink"));

        await waitFor(() => expect(screen.getByText("Start")).toBeInTheDocument());
    });
});
