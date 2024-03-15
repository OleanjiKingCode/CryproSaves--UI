export const extractErrorMessage = (contractCallText: any) => {
  const regex = /reverted with the following reason:(.*?)Contract Call:/s;
  const match = regex.exec(contractCallText);

  if (match && match[1]) {
    const reason = match[1].trim();
    return reason;
  } else {
    return null;
  }
};
