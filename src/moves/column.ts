export function removeCardFromColumn(card, column) {
  if (column.length === 0) {
    return;
  }
  const index = column.findIndex(
    (colCard) =>
      colCard.flower === card.flower && colCard.number === card.number
  );

  // Make sure that we actually found the card in the column.
  if (index === -1) {
    throw new Error(
      `Expected to find the card ${JSON.stringify(card)} in column number ${
        card.col
      } but did not find the card.`
    );
  }

  // Make sure that this card is actually on the top.
  if (index !== column.length - 1) {
    throw new Error(
      `Expected to remove card ${JSON.stringify(
        card
      )} from top of column number ${card.col} with ${
        column.length
      } cards, but found the card at index ${index}`
    );
  }

  column.splice(index, 1);

  if (column.length > 0) {
    column[column.length - 1].hidden = false;
  }
}
