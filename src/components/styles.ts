export interface StyleSheet {
  [key: string]: React.CSSProperties;
}

export const styles: StyleSheet = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#F1F2EB",
    width: 250,
  },
  cardTitle: {
    margin: 20,
    padding: 3,
    borderRadius: 10,
    backgroundColor: "#D8DAD3",
    width: 200,
  },
  cardDescription: {
    flex: 1,
    padding: 2,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#D8DAD3",
    width: 200,
  },
  cardDelete: {
    margin: 20,
    padding: 3,
    borderRadius: 10,
    backgroundColor: "#D8DAD3",
    width: 200,
  },
  cardButton: {
    alignSelf: "flex-end",
    padding: 2,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#A4C2A5",
    height: 20,
    width: 60,
  },
  cardEditContainer: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#A4C2A5",
    height: 150,
    width: 250,
  },
};
