function handRandomCard(arr) {
 let randomArray = arr.sort(() => Math.random() - 0.5);
 return randomArray.slice(0, 5);
}

console.log(
 handRandomCard([
  { id: 1, name: "Card1" },
  { id: 2, name: "Card2" },
  { id: 3, name: "Card3" },
  { id: 4, name: "Card4" },
  { id: 5, name: "Card5" },
  { id: 6, name: "Card6" },
  { id: 7, name: "Card7" },
  { id: 8, name: "Card8" },
 ])
);

export default handRandomCard;
