import {render, cleanup} from "@testing-library/react"
import {expect, test, afterEach} from "vitest";
import Header from '../components/Header'

afterEach(cleanup )

test("Header displays correct text", async () => {
    const screen = render(
        <Header></Header>
    );

const h3 = await screen.findByRole("heading", { level: 3 });    

    expect(h3.innerText).toBe("Keyboard Shortcuts Game")
})