function Input({ type, placeholder, handleChange, value }) {
  return (
    <div className="input__container">
      <input
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required
      />
    </div>
  );
}

export default Input;
