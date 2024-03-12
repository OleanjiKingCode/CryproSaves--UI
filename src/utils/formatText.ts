export const formatText = (text: string) => {
  const sourceCode = text.replace(/\\n/g, '\n'); // Replace '\\n' with actual line breaks
  const formattedSourceCode = sourceCode.split('\n');
  return formattedSourceCode;
};
