export const initialY = 10;
export const distance = 1.1;

export const initialTexts = [
  {
    content: "T",
    position: [-1.5 * distance, initialY, 0],
    rotation: [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    ],
  },
  {
    content: "y",
    position: [-0.5 * distance, initialY, 0],
    rotation: [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    ],
  },
  {
    content: "p",
    position: [0.5 * distance, initialY, 0],
    rotation: [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    ],
  },
  {
    content: "e",
    position: [1.5 * distance, initialY, 0],
    rotation: [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    ],
  },
];
