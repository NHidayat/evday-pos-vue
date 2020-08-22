const menuIcon = document.querySelector('.menu-icon')
const sidebar = document.querySelector('.sidebar')
let op = {sidebarOn: true}
menuIcon.addEventListener('click', () => {
	if (op.sidebarOn == true) {
		sidebar.style.left = '-60px'
		op.sidebarOn = false
	} else {
		sidebar.style.left = '0'
		op.sidebarOn = true
	}
})