import Card from "../components/Card";
import { removeCardFromColumn } from "./column";

describe("Removing card from column", () => {
  it("should be a noop if the column length is 0", () => {
    // Arrange
    const column = [];
    const card = { flower: "spade", number: 1, col: 0, hidden: false };

    // Act / Assert
    expect(() => removeCardFromColumn(card, column)).not.toThrow();
    expect(column).toHaveLength(0);
  });

  it("should be able to remove last card in column", () => {
    // Arrange
    const column = [{ flower: "spade", number: 1, col: 0, hidden: true }];
    const card = { flower: "spade", number: 1, col: 0, hidden: false };

    // Act
    removeCardFromColumn(card, column);

    // Assert
    expect(column).toHaveLength(0);
  });

  it("should fail to remove card from column if the card does not exist in column", () => {
    // Arrange
    const column = [{ flower: "spade", number: 1, col: 0, hidden: true }];
    const card = { flower: "heart", number: 2, col: 0, hidden: false };

    // Assert / Act
    expect(() => removeCardFromColumn(card, column)).toThrowError(
      /did not find the card/
    );
  });

  it("should remove the card from the column only if it's on the top", () => {
    // Arrange
    const column = [
      { flower: "spade", number: 1, col: 0, hidden: true },
      { flower: "spade", number: 2, col: 0, hidden: true },
      { flower: "spade", number: 3, col: 0, hidden: true },
    ];
    const card = { flower: "spade", number: 2, col: 0, hidden: false };

    // Assert / Act
    expect(() => removeCardFromColumn(card, column)).toThrowError(
      /from top of column .+ but found the card at index 1/
    );
  });

  it("should remove last card from column and reveal next card", () => {
    // Arrange
    const column = [
      { flower: "spade", number: 1, col: 0, hidden: true },
      { flower: "spade", number: 2, col: 0, hidden: true },
      { flower: "spade", number: 3, col: 0, hidden: true },
    ];
    const card = { flower: "spade", number: 3, col: 0, hidden: false };

    // Act
    removeCardFromColumn(card, column);

    // Assert
    expect(column).toHaveLength(2);
    expect(column[0].hidden).toBeTruthy();
    expect(column[1].hidden).toBeFalsy();
  });
});
