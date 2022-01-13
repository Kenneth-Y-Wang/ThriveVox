export default function checkDisplay(content) {
  if (!content) {
    return 'N/A';
  } else if (content && content === 'null') {
    return 'N/A';
  } else {
    return content;
  }
}
