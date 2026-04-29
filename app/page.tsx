import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"

export default function Page() {
  return (
    <div>
      <Section>
        <Content>
          <Article>
            <h1>Welcome to Canvas for Coders!</h1>
            <p>
              I’ve always thought of the browser as a creative medium. It runs
              everywhere, it can do visuals and sound, anything you make can
              reach anyone with a link, and best of all — it’s interactive. As I
              like to say:
            </p>
            <blockquote>
              Web browser is a twenty-first century canvas.
            </blockquote>
            <p>
              For the next seven weeks, we’ll explore Three.js and React Three
              Fiber as tools for putting your ideas on the web. Bring your
              curiosity, your questions, and whatever you’ve been wanting to
              make. I’m looking forward to building with you.
            </p>
            <p>:)</p>
          </Article>
        </Content>
      </Section>

      <Section>
        <Content>
          <Article>
            <h2>Info</h2>
            <ul>
              <li>
                <strong>Instructor:</strong>{" "}
                <a href="mailto:jhp527@nyu.edu">Joohyun Park</a>
              </li>
              <li>
                <strong>Class:</strong> Thursdays, Oct 23 &ndash; Dec 11, 2025,
                6:00&ndash;8:30pm. 370 Jay Street, Room 409, Brooklyn Campus.
              </li>
              <li>
                <strong>Office hours:</strong> Thursdays, 8:30&ndash;9:, same
                room.
              </li>
            </ul>

            <h2>Course objectives</h2>
            <p>By the end of this course, you will:</p>
            <ul>
              <li>See the web as a creative medium of your own.</li>
              <li>
                Build 3D web experiences confidently with Three.js and React
                Three Fiber.
              </li>
            </ul>

            <h2>Course values</h2>
            <h3>Create together</h3>
            <p>
              We work as a team. Every perspective counts, and ideas grow
              through collaboration.
            </p>

            <h3>Learn and iterate</h3>
            <p>
              Ideate, research, prototype, repeat. Write code, make mistakes,
              learn by doing.
            </p>

            <h3>Discuss</h3>
            <p>
              Bring your questions and curiosities. Honest conversation helps
              everyone grow.
            </p>
          </Article>
        </Content>
      </Section>
    </div>
  )
}
