import styles from "./index.module.css";

const Button = ({ children, variant = "solid", ...props }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
