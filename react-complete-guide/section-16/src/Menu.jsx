import { useState, useEffect, useRef } from "react";

const Menu = () => {
  const [activeSection, setActiveSection] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    //create new instance and pass a callback function
    observer.current = new IntersectionObserver((entries) => {
      const visibleSection = entries.find(
        (entry) => entry.isIntersecting
      )?.target;
      //Update state with the visible section ID
      if (visibleSection) {
        setActiveSection(visibleSection.id);
      }
    });

    //Get custom attribute data-section from all sections
    const sections = document.querySelectorAll("[data-section]");

    sections.forEach((section) => {
      observer.current.observe(section);
    });
    //Cleanup function to remove observer
    return () => {
      sections.forEach((section) => {
        observer.current.unobserve(section);
      });
    };
  }, []);
  const activeStyle = {
    fontWeight: "bold",
    color: "red",
    textDecoration: "underline",
  };

  return (
    <>
      <nav style={{ position: "fixed", top: 0 }}>
        <ul
          style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}
        >
          <li
            className={activeSection === "section1" ? "active" : ""}
            style={{ margin: "0 10px" }}
          >
            <a
              href="#section1"
              style={activeSection === "section1" ? activeStyle : {}}
            >
              Section 1
            </a>
          </li>

          <li
            className={activeSection === "section2" ? "active" : ""}
            style={{ margin: "0 10px" }}
          >
            <a
              href="#section2"
              style={activeSection === "section2" ? activeStyle : {}}
            >
              Section 2
            </a>
          </li>
          <li
            className={activeSection === "section3" ? "active" : ""}
            style={{ margin: "0 10px" }}
          >
            <a
              href="#section3"
              style={activeSection === "section3" ? activeStyle : {}}
            >
              Section 3
            </a>
          </li>
        </ul>
      </nav>
      <div style={{ marginTop: "40px" }}>
        <div
          data-section
          id="section1"
          style={{ height: "100vh", paddingTop: "30px" }}
        >
          <h3>Section 1</h3>
          <p>
            In this implementation, we define a <code>handleScroll</code>{" "}
            function that is called every time the user scrolls the page. This
            function uses <code>window.pageYOffset</code> to get the page's
            current scroll position and then checks each section's position and
            height to determine which section is currently in view. The{" "}
            <code>sections</code> ref is used to keep track of the section
            elements.
          </p>
          <p>
            We then use <code>useEffect</code> to add an event listener for the{" "}
            <code>scroll</code> event and remove it when the component is
            unmounted. Finally, we update the active section state and render
            the active style based on the current active section.
          </p>
          <p>
            View sample implementation on{" "}
            <a
              target="_blank"
              href="https://codesandbox.io/s/event-listener-g0vhny?file=/src/App.js:82-148"
            >
              sandbox
            </a>
          </p>
          <h3 id="heading-summary">Summary</h3>
          <p>
            Event Listeners provide more flexibility and control over how and
            when elements are detected. They can be used to detect a variety of
            events, not just intersection with the viewport. However, they can
            be less performant if not properly optimized, as they require
            continuous checks on the DOM.
          </p>
          <p>
            The Intersection Observer API is designed specifically for detecting
            when an element enters or leaves the viewport. It is efficient and
            does not require continuous checks as event listeners do, which can
            improve performance. However, it may not always be supported by
            older browsers, and there can be situations where it skips over some
            elements.
          </p>
          <p>
            Ultimately, it's up to you to decide which method to use based on
            your specific needs and the trade-offs involved.
          </p>
          <h3 id="heading-conclusion">Conclusion</h3>
          <p>
            I used the Event Listener for my project as the codebase was bulky
            and involved a lot of components. Also, the Intersection Observer
            API kept skipping over a lot of my navigation menu(haven't found a
            fix for this yet), which prompted me to choose the Event Listener.
            With the Event Listener, I had more control over how the event was
            being handled and the flexibility to adapt it to my needs
          </p>
          <p>I hope this helps you in deciding what method to use.</p>
          <p>
            Drop some comments if you found this interesting or have an
            alternative solution.
          </p>
        </div>
        <div
          data-section
          id="section2"
          style={{ height: "100vh", paddingTop: "30px" }}
        >
          <h3>Section 2</h3>
          <p>
            In this implementation, we define a <code>handleScroll</code>{" "}
            function that is called every time the user scrolls the page. This
            function uses <code>window.pageYOffset</code> to get the page's
            current scroll position and then checks each section's position and
            height to determine which section is currently in view. The{" "}
            <code>sections</code> ref is used to keep track of the section
            elements.
          </p>
          <p>
            We then use <code>useEffect</code> to add an event listener for the{" "}
            <code>scroll</code> event and remove it when the component is
            unmounted. Finally, we update the active section state and render
            the active style based on the current active section.
          </p>
          <p>
            View sample implementation on{" "}
            <a
              target="_blank"
              href="https://codesandbox.io/s/event-listener-g0vhny?file=/src/App.js:82-148"
            >
              sandbox
            </a>
          </p>
          <h3 id="heading-summary">Summary</h3>
          <p>
            Event Listeners provide more flexibility and control over how and
            when elements are detected. They can be used to detect a variety of
            events, not just intersection with the viewport. However, they can
            be less performant if not properly optimized, as they require
            continuous checks on the DOM.
          </p>
          <p>
            The Intersection Observer API is designed specifically for detecting
            when an element enters or leaves the viewport. It is efficient and
            does not require continuous checks as event listeners do, which can
            improve performance. However, it may not always be supported by
            older browsers, and there can be situations where it skips over some
            elements.
          </p>
          <p>
            Ultimately, it's up to you to decide which method to use based on
            your specific needs and the trade-offs involved.
          </p>
          <h3 id="heading-conclusion">Conclusion</h3>
          <p>
            I used the Event Listener for my project as the codebase was bulky
            and involved a lot of components. Also, the Intersection Observer
            API kept skipping over a lot of my navigation menu(haven't found a
            fix for this yet), which prompted me to choose the Event Listener.
            With the Event Listener, I had more control over how the event was
            being handled and the flexibility to adapt it to my needs
          </p>
          <p>I hope this helps you in deciding what method to use.</p>
          <p>
            Drop some comments if you found this interesting or have an
            alternative solution.
          </p>
        </div>
        <div
          data-section
          id="section3"
          style={{ height: "100vh", paddingTop: "30px" }}
        >
          <h3>Section 3</h3>
          <p>
            In this implementation, we define a <code>handleScroll</code>{" "}
            function that is called every time the user scrolls the page. This
            function uses <code>window.pageYOffset</code> to get the page's
            current scroll position and then checks each section's position and
            height to determine which section is currently in view. The{" "}
            <code>sections</code> ref is used to keep track of the section
            elements.
          </p>
          <p>
            We then use <code>useEffect</code> to add an event listener for the{" "}
            <code>scroll</code> event and remove it when the component is
            unmounted. Finally, we update the active section state and render
            the active style based on the current active section.
          </p>
          <p>
            View sample implementation on{" "}
            <a
              target="_blank"
              href="https://codesandbox.io/s/event-listener-g0vhny?file=/src/App.js:82-148"
            >
              sandbox
            </a>
          </p>
          <h3 id="heading-summary">Summary</h3>
          <p>
            Event Listeners provide more flexibility and control over how and
            when elements are detected. They can be used to detect a variety of
            events, not just intersection with the viewport. However, they can
            be less performant if not properly optimized, as they require
            continuous checks on the DOM.
          </p>
          <p>
            The Intersection Observer API is designed specifically for detecting
            when an element enters or leaves the viewport. It is efficient and
            does not require continuous checks as event listeners do, which can
            improve performance. However, it may not always be supported by
            older browsers, and there can be situations where it skips over some
            elements.
          </p>
          <p>
            Ultimately, it's up to you to decide which method to use based on
            your specific needs and the trade-offs involved.
          </p>
          <h3 id="heading-conclusion">Conclusion</h3>
          <p>
            I used the Event Listener for my project as the codebase was bulky
            and involved a lot of components. Also, the Intersection Observer
            API kept skipping over a lot of my navigation menu(haven't found a
            fix for this yet), which prompted me to choose the Event Listener.
            With the Event Listener, I had more control over how the event was
            being handled and the flexibility to adapt it to my needs
          </p>
          <p>I hope this helps you in deciding what method to use.</p>
          <p>
            Drop some comments if you found this interesting or have an
            alternative solution.
          </p>
        </div>
      </div>
    </>
  );
};

export default Menu;
