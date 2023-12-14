(async () => {
    let container = document.getElementById('theGame');

    // solve for me button on top (first child inside container div)
    const solve = document.createElement('button');
    solve.innerText = "Solve for me!"
    container.appendChild(solve);
    solve.style.margin = "20px 0";

    // creating table and tbody elements
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    table.style.borderSpacing = "0";

    

    // Appending the created elements in our theGame div
    container.appendChild(table);
    table.appendChild(tbody);


    // Fetching data from API and storing it in data variable
    let response = await fetch('https://prog2700.onrender.com/threeinarow/random');
    let data = await response.json();


    // In arr we are storing tr element
    let arr = [];

    let tdArray = [];

    // Using nested loops we are creating tr and td element
    for (let i = 0; i < data.rows.length; i++) {
        // Making tdArray a 2d array
        tdArray[i] = []
        
        // Creating tr element and storing inside arr[i]
        arr[i] = document.createElement('tr');

        // appending the row element inside tbody
        tbody.appendChild(arr[i]);
        for (let j = 0; j < data.rows[i].length; j++) {
            // Creating td element and giving the the class as currentState that we are getting from API so that we can later use className to compare with correct state
            tdArray[i][j] = document.createElement('td');
            tdArray[i][j].classList.add(data.rows[i][j].currentState);
            // tdArray[i][j].innerText = data.rows[i][j].correctState;

            // In every tr element that was created above we are inserting td elements rows[i].length number of times.
            arr[i].appendChild(tdArray[i][j]);
        }
    }

    // Providing css to our newly created td elements
    tdArray.forEach((elem) => {
        elem.forEach((val) => {
            val.style.textAlign = "Center";
            val.style.width = "50px"
            val.style.height = "50px"
            val.style.border = "1px solid black";
        })
    })

    // Creating a div element which will be the 3rd child of container
    const div = document.createElement('div');
    container.appendChild(div);


    div.style.margin = "20px 0px"
    div.style.display = "flex";
    div.style.gap = "20px";

    // Creating buttons and checkbox
    const checkBtn = document.createElement('button');
    const showErrorsDiv = document.createElement('div');
    const showErrors = document.createElement('input');
    const reset = document.createElement('button');
    const showErrorsLabel = document.createElement('label');

    checkBtn.innerText = "Check";
    div.appendChild(checkBtn);

    div.appendChild(showErrorsDiv);

    // making the input's type as checkbox
    showErrors.setAttribute('type', 'checkbox');

    // Inserting text inside the label element
    showErrorsLabel.innerText = "Show Errors";

    // Inserting the showErrors element and showErrorsLabel inside showErrorsDiv
    showErrorsDiv.appendChild(showErrors)
    showErrorsDiv.appendChild(showErrorsLabel)

    // Styling for showErrorsDiv
    showErrorsDiv.style.display = "flex"
    showErrorsDiv.style.justifyContent = "center"
    showErrorsDiv.style.alignItems = "center"

    
    // Inserting text inside reset button and appending it inside the div element
    reset.innerText = "Reset";
    div.appendChild(reset);

    // checkNotification displays "Something is wrong"/"So far so good" when clicked on the check button
    const checkNotification = document.createElement('div');
    checkNotification.innerText = "";
    container.appendChild(checkNotification);



    // Sets the background color of the initial grid we receive from our api
    const setBgColor = () => {


        let count = 0;
        for (let i = 0; i < data.rows.length; i++) {

            for (let j = 0; j < data.rows[i].length; j++) {


                if (tdArray[i][j].className == 0) {
                    tdArray[i][j].style.backgroundColor = "#b1adad";

                }
                else if (tdArray[i][j].className == 1) {
                    tdArray[i][j].style.backgroundColor = "blue";

                }
                else if (tdArray[i][j].className == 2) {
                    tdArray[i][j].style.backgroundColor = "white";


                }

                count++;

            }
        }


    }
    setBgColor();





    // This function ensures when clicking on the column its state as well as color changes based on the current state 
    const changeState = () => {
        let count = 0;
        for (let i = 0; i < data.rows.length; i++) {
            for (let j = 0; j < data.rows[i].length; j++) {


                tdArray[i][j].addEventListener('click', () => {

                    showErrors.checked = false;
                    checkNotification.innerText = "";

                    if (data.rows[i][j].canToggle) {
                        let className = tdArray[i][j].className;

                        count = Number(tdArray[i][j].className) + 1;

                        if (count > 2) {
                            count = 0;
                        }
                        tdArray[i][j].classList.replace(className, count);
                        if (tdArray[i][j].className == 0) {
                            tdArray[i][j].style.backgroundColor = "#b1adad"
                            tdArray[i][j].textContent = "";
                        }
                        if (tdArray[i][j].className == 1) {
                            tdArray[i][j].style.backgroundColor = "Blue"
                            tdArray[i][j].textContent = "";
                        }
                        if (tdArray[i][j].className == 2) {
                            tdArray[i][j].style.backgroundColor = "white"
                            tdArray[i][j].textContent = "";
                        }



                    }


                })

                // curState = data.rows[i][j].className;
            }

        }

    }

    changeState();


    // Innovating feature which allows us to solve the entire puzzle with just a click of a button 
    const solveForMe = () => {
        for (let i = 0; i < data.rows.length; i++) {
            for (let j = 0; j < data.rows[i].length; j++) {
                console.log(data);
                let className = tdArray[i][j].className;
                tdArray[i][j].classList.replace(className, data.rows[i][j].correctState);
                if (tdArray[i][j].className == 0) {
                    tdArray[i][j].style.backgroundColor = "#b1adad"
                    tdArray[i][j].textContent = "";
                }
                if (tdArray[i][j].className == 1) {
                    tdArray[i][j].style.backgroundColor = "Blue"
                    tdArray[i][j].textContent = "";
                }
                if (tdArray[i][j].className == 2) {
                    tdArray[i][j].style.backgroundColor = "white"
                    tdArray[i][j].textContent = "";
                }
            }
        }
    }

    solve.addEventListener('click', solveForMe);


    // check function checks if there are any errors in the puzzle and displays "Something is wrong"/"So far so good"/"You did it"
    const check = () => {
        let winCount = 0;
        let flag = false;
        let count = 0;
        for (let i = 0; i < data.rows.length; i++) {
            for (let j = 0; j < data.rows[i].length; j++) {

                if (tdArray[i][j].className == data.rows[i][j].currentState) {
                    count++;
                }


                if (tdArray[i][j].className != data.rows[i][j].currentState && tdArray[i][j].className != data.rows[i][j].correctState) {

                    flag = true;
                    checkNotification.innerText = "Something is Wrong"
                    checkNotification.style.color = "crimson";
                }

                else if (tdArray[i][j].className != data.rows[i][j].currentState && tdArray[i][j].className == data.rows[i][j].correctState) {


                    checkNotification.innerText = "So far so good!"
                    checkNotification.style.color = "green";

                }

                if (tdArray[i][j].className == data.rows[i][j].correctState) {
                    winCount++;
                }


            }

        }
        console.log(count);
        if (flag) {
            checkNotification.innerText = "Something is Wrong";
            checkNotification.style.color = "crimson";
        }
        if (count == data.rows.length * data.rows.length) {
            checkNotification.innerText = "So far so good!"
            checkNotification.style.color = "green";
        }
        if (winCount == data.rows.length * data.rows.length) {
            checkNotification.innerText = "You did it!"
            checkNotification.style.color = "green";
        }
    }

    checkBtn.addEventListener('click', check);

    // This function displays the errors as a red X if the there are any mistakes in any column
    const showIncorrectCol = () => {

        for (let i = 0; i < data.rows.length; i++) {
            for (let j = 0; j < data.rows[i].length; j++) {


                if (tdArray[i][j].className != data.rows[i][j].currentState && tdArray[i][j].className != data.rows[i][j].correctState) {
                    if (showErrors.checked) {

                        tdArray[i][j].style.color = "crimson";
                        tdArray[i][j].textContent = "X";

                    }
                    else {
                        tdArray[i][j].textContent = "";
                        checkNotification.innerText = "";
                    }
                }



            }

        }
    }

    showErrors.addEventListener('click', showIncorrectCol)

    // Reset just resets the game by reloading the page
    reset.addEventListener('click', () => {
        location.reload();
    })

})();