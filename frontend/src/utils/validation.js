// Validates names (donor or organization)
export const validateName = (name) => {
  // Remove extra spaces and check length
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return { isValid: false, message: "Name must be at least 2 characters long" };
  }
  if (trimmedName.length > 50) {
    return { isValid: false, message: "Name cannot exceed 50 characters" };
  }

  // Check if name contains only letters, spaces, dots, and common special characters
  const nameRegex = /^[a-zA-Z\s.'"-]{2,}$/;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, message: "Name can only contain letters, spaces, and basic punctuation" };
  }

  // Check for consecutive special characters
  if (/[.'"-]{2,}/.test(trimmedName)) {
    return { isValid: false, message: "Name cannot contain consecutive special characters" };
  }

  // Check for proper capitalization (first letter of each word)
  const words = trimmedName.split(' ');
  const properCapitalization = words.every(word => 
    word.length === 0 || (word[0] === word[0].toUpperCase() && word.slice(1) === word.slice(1).toLowerCase())
  );
  
  if (!properCapitalization) {
    return { isValid: false, message: "Each word should start with a capital letter" };
  }

  return { isValid: true, message: "" };
};
