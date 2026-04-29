import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { CodeBlock } from "@/components/site/code-block"

export const metadata: Metadata = {
  title: "Week 1",
}

const installCode = `npm create vite@latest my-app -- --template vanilla
cd my-app
npm install
npm install three
npm run dev`

const vectorCode = `import * as THREE from "three"

const v = new THREE.Vector3(1, 2, 3)
v.x = 5
v.add(new THREE.Vector3(0, 1, 0))
console.log(v) // Vector3 { x: 5, y: 3, z: 3 }`

const colorCode = `import * as THREE from "three"

const a = new THREE.Color("tomato")
const b = new THREE.Color("#3366ff")
const c = new THREE.Color(1, 0, 0.5)`

const objectCode = `import * as THREE from "three"

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)

mesh.position.set(0, 1, 0)
mesh.rotation.y = Math.PI / 4
mesh.scale.setScalar(2)

scene.add(mesh)`

export default function Week1Page() {
  return (
    <div>
      <Section>
        <Content>
          <Article>
            <h1>Week 1: Introduction</h1>
            <p>
              Welcome. This semester we treat the web as a creative medium.
              The browser already includes a 3D graphics pipeline and a render
              loop; our job is to learn how to use them.
            </p>

            <h2>Your go-to dictionary</h2>
            <p>
              You are not expected to memorize the Three.js API. Keep these
              two references open while you work:
            </p>
            <ul>
              <li>
                <a
                  href="https://threejs.org/docs/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Three.js documentation
                </a>{" "}
                for the API reference.
              </li>
              <li>
                <a
                  href="https://threejs.org/manual/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Three.js fundamentals
                </a>{" "}
                for tutorial-style explanations.
              </li>
            </ul>

            <h2>Thinking in xyz space</h2>
            <p>
              Open the{" "}
              <a
                href="https://threejs.org/editor/"
                target="_blank"
                rel="noreferrer"
              >
                Three.js editor
              </a>{" "}
              and add a few primitives. Three things to notice:
            </p>
            <ul>
              <li>
                <code>x</code> goes right, <code>y</code> goes up,{" "}
                <code>z</code> comes toward the camera.
              </li>
              <li>
                Every object has a <code>position</code>, <code>rotation</code>,
                and <code>scale</code>.
              </li>
              <li>
                The camera is also an object. Move it instead of moving the
                world.
              </li>
            </ul>

            <h2>Getting started with a Vite project</h2>
            <p>
              Vite is a dev server and bundler. It gives you fast reload and
              ES module imports, so you can pull in <code>three</code> like
              any other package.
            </p>
          </Article>
        </Content>
      </Section>

      <Section>
        <Content>
          <CodeBlock code={installCode} lang="sh" />
        </Content>
      </Section>

      <Section>
        <Content>
          <Article>
            <h2>Vectors</h2>
            <p>
              A <code>Vector3</code> holds three numbers: <code>x</code>,{" "}
              <code>y</code>, <code>z</code>. We use it for positions,
              directions, and any other quantity with three components.
            </p>
          </Article>
        </Content>
      </Section>

      <Section>
        <Content>
          <CodeBlock code={vectorCode} lang="ts" />
        </Content>
      </Section>

      <Section>
        <Content>
          <Article>
            <h2>Colors</h2>
            <p>
              <code>Color</code> accepts a CSS name, a hex string, or three
              numbers in the range 0&ndash;1. Three.js stores it as floats so
              the GPU can blend between values.
            </p>
          </Article>
        </Content>
      </Section>

      <Section>
        <Content>
          <CodeBlock code={colorCode} lang="ts" />
        </Content>
      </Section>

      <Section>
        <Content>
          <Article>
            <h2>Object properties</h2>
            <p>
              Meshes, lights, cameras, and groups all extend{" "}
              <code>Object3D</code>. They share the same transform:{" "}
              <code>position</code>, <code>rotation</code>, and{" "}
              <code>scale</code>. Add an object with <code>scene.add()</code>.
            </p>
          </Article>
        </Content>
      </Section>

      <Section>
        <Content>
          <CodeBlock code={objectCode} lang="ts" />
        </Content>
      </Section>
    </div>
  )
}
