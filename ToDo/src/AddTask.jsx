import { useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import './AddTask.css'


function AddTask(props) {
    const [task, setTask] = useState('')
    const [sun, setSun] = useState(false)
    const [mon, setMon] = useState(false)
    const [tues, setTues] = useState(false)
    const [wed, setWed] = useState(false)
    const [thur, setThur] = useState(false)
    const [fri, setFri] = useState(false)
    const [sat, setSat] = useState(false)

    const [sections, setSections] = useState([<Dropdown.Item onClick={()=>handleSectionClick("Work")}>Work</Dropdown.Item>, 
    <Dropdown.Item onClick={()=>handleSectionClick("Personal")}>Personal</Dropdown.Item>, 
    <Dropdown.Item onClick={()=>handleSectionClick("Add New")}>Add New</Dropdown.Item>])

    const [newSectionTest, setNewSectionTest] = useState([])


//     //function addSections(){
//         useEffect(() =>{
//             console.log("USE EFFECT")
//             //gets the new list without the Add New object
//             let newSectionList = [...sections.slice(0, sections.length-1)]
//             for(let x = 0; x < props.storedSections.length; x++){
//                 console.log(props.storedSections[x])
//                 if(sections.indexOf(props.storedSections[x]) == -1)
//                 console.log("NOT ALREADY IN THE LIST")
//                 //adds the new object that they want to add
//                 newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick(props.storedSections[x])}>{props.storedSections[x]}</Dropdown.Item>)
//             }
            
//             //then adds in the Add new object again
//             newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick("Add New")}>Add New</Dropdown.Item>)
//             // console.log("NEW SECTION LIST: ")
//             // newSectionList.map((index) =>{
//             //     console.log(index)
//             // })
            
//             setSections(newSectionList)
//             setNewSectionTest(newSectionList)
//             console.log("NEW SECTION LIST:")
//             // newSectionList.map((index) =>{
//             //     console.log(index)
//             // })
//         }, [])
//    // }

useEffect(() =>{
    //gets the new list without the Add New object
    let newSectionList = [...sections.slice(0, sections.length-1)]
    for(let x = 0; x < props.storedSections.length; x++){
        if(sections.indexOf(props.storedSections[x]) == -1)
        //adds the new object that they want to add
        newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick(props.storedSections[x])}>{props.storedSections[x]}</Dropdown.Item>)
    }
    
    //then adds in the Add new object again
    newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick("Add New")}>Add New</Dropdown.Item>)

    console.log("This is new seciton list : ")
    newSectionList.map((index) => {
        console.log(index)
    })
    // setSections(newSectionList)
    setNewSectionTest(newSectionList)
}, [props.storedSections, sections])


    const [currentSection, setCurrentSection] = useState('Work')
    
    const [newSection, setNewSection] = useState(false)
    const [newSectionText, setNewSectionText] = useState('')

    function handleDayClicked(event){
        if(event.target.id === 'sun'){
            setSun(!sun)
        }
        if(event.target.id === 'mon'){
            setMon(!mon)
        }
        if(event.target.id === 'tues'){
            setTues(!tues)
        }
        if(event.target.id === 'wed'){
            setWed(!wed)
        }
        if(event.target.id === 'thur'){
            setThur(!thur)
        }
        if(event.target.id === 'fri'){
            setFri(!fri)
        }
        if(event.target.id === 'sat'){
            setSat(!sat)
        }
    }

    const taskChange = event =>{
        setTask(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(task != ''){
            // console.log(props.add)
            const newItem = { name: task, checked: false}
            props.setList(props.list.concat(newItem))
            // console.log("Submitted")
            props.checkListSize()
            props.setAdd(false)
        }
        else{
            alert("You cannot add an empty task")
        }
    }

    function handleCancel() {
        setTask('')
        props.setAdd(false)
    }

    function handleSectionClick(item) {
        console.log("section click title clicked: " + item)
        //if they select the Add New section from the dropdown then bring up the option to type a new one
        if (item === "Add New") {
            console.log(item + " === Add New")
            setNewSection(true)
          }
          //updates the header for the dropdown and keeps track of which section should be saved for the task
          else{
            setCurrentSection(item)
          }
      }


    function handleNewSection(){
        console.log("handling new section")
        //gets the new list without the Add New object
        //const newSectionList = [...sections.slice(0, sections.length-1)]
        const newSectionList = [...newSectionTest.slice(0, newSectionTest.length-1)]
        //adds the new object that they want to add
        newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick(newSectionText)}>{newSectionText}</Dropdown.Item>)
        //then adds in the Add new object again
        newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick("Add New")}>Add New</Dropdown.Item>)

        //updates the dropdown list
        //setSections(newSectionList)
        //sets it so the new section should not show up
        setNewSection(false)
        //resets the new section text so when they add a new section it doesn't have the last section they wanted
        setNewSectionText("")

        console.log("this is the newSection list in the handle new section")
        console.log(newSectionList)
        setNewSectionTest(newSectionList)



        //Updates the stored sections
        props.setStoredSections([...props.storedSections, newSectionText])
      }

    const handleNewSectionTextChange = event =>{
        setNewSectionText(event.target.value)
    }

    return(
    <>
    
    <div className="taskModal" style={{paddingTop: "15px"}}> 
        <Button onClick={handleCancel} className="cancel">X</Button>
        <form onSubmit={handleSubmit}>
            <label>
                Task:
                <input type="text" className="taskInput" value={task} onChange={taskChange}  />
            </label>
            <input type="submit" value="Submit"/>
        </form>

        <div className="repeat">What days do you want this task to repeat?</div>
        <div className="days">
            <Button className='sun' id="sun" onClick={handleDayClicked} style={{ backgroundColor: sun ? "lightgreen" : "red" }}>S</Button>
            <Button className='mon' id="mon" onClick={handleDayClicked} style={{ backgroundColor: mon ? "lightgreen" : "red" }}>M</Button>
            <Button className='tues' id="tues" onClick={handleDayClicked} style={{ backgroundColor: tues ? "lightgreen" : "red" }}>T</Button>
            <Button className='wed' id="wed" onClick={handleDayClicked} style={{ backgroundColor: wed ? "lightgreen" : "red" }}>W</Button>
            <Button className='thur' id="thur" onClick={handleDayClicked} style={{ backgroundColor: thur ? "lightgreen" : "red" }}>TR</Button>
            <Button className='fri' id="fri" onClick={handleDayClicked} style={{ backgroundColor: fri ? "lightgreen" : "red" }}>F</Button>
            <Button className='sat' id="sat" onClick={handleDayClicked} style={{ backgroundColor: sat ? "lightgreen" : "red" }}>SA</Button>
        </div>

        <div className="section">
            
            <Dropdown id = "dropdownBtn" className="dropdownBtn" title={"Example"}>
                <Dropdown.Toggle id="dropdown-autoclose-true " className="dropdownBtn">
                {currentSection}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {newSectionTest.map((index) => {
                        // console.log(index.props.children)
                        return(index)
                    })}
                </Dropdown.Menu>
            </Dropdown>
            {newSection && <form onSubmit={handleNewSection}>
            <label>
                New Section:
                <input type="text" className="taskInput" value={newSectionText} onChange={handleNewSectionTextChange}  />
            </label>
            <input type="submit" value="Submit"/>
        </form>}
        </div>
    </div>
    </>
    )
}

export default AddTask