const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.href
const id = params.split("/").pop()
let tempName

const urlParts = window.location.href.split('/');
const user_id = urlParts[urlParts.indexOf('user') + 1];


const showTask = async () => {
  try {
    const response = await axios.get(`/user/${user_id}/get_task/${id}`)
    console.log(response.data.id)
    taskIDDOM.textContent = response.data.id
    taskNameDOM.value = response.data.task
    tempName = response.data.task
    if (response.data.completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

document.getElementById('go-back').addEventListener('click', function (e) {
  e.preventDefault();
  console.log("run bhayo go back button")
  // history.go(-1); // or history.go(-1);
  window.location.href = `http://localhost:3000/user/${user_id}`
});

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const response = await axios.patch(`/user/${user_id}/task/${id}`, {
      task: taskName,
      completed: taskCompleted,
    })

    taskIDDOM.textContent = response.data.id
    taskNameDOM.value = response.data.task
    tempName = response.data.task
    if (response.data.completed) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})