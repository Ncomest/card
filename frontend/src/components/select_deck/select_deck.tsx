
function SelectDeck() {
 const handleSelectDeck = (e: any) => {
  const name = e.target.value;
  fetch("http://localhost:4000/api/hand", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ deck: name, user: sessionStorage.getItem("player") }),
  })
   .then((res) => res.json())
   .then((res) => console.log(res))
   .catch((err) => console.log(err));
 };

 return (
  <>
   <button onClick={handleSelectDeck} value="orcs">
    orcs
   </button>
   <button onClick={handleSelectDeck} value="humans">
    humans
   </button>
  </>
 );
}

export default SelectDeck;
