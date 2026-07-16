import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {describe, it, expect} from "vitest";
import Header from "../components/Header/Header";

describe("Header", () => {
    it("renders the header with links", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const homeLink = screen.getByText("lowkey");
        const aboutLink = screen.getByText("About");

        expect(homeLink).to.exist;
        expect(aboutLink).to.exist;

        expect(homeLink.getAttribute("href")).to.equal("/");
        expect(aboutLink.getAttribute("href")).to.equal("/about");
    })
})