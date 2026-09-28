/* =========================================
   VELORA TEACHER DASHBOARD
========================================= */


/* =========================================
   TEACHERS
========================================= */

const teachers = {

    akramjonova: {
        name: "Akramjonova Jadra Maratovna",
        shortName: "Jadra",
        subject: "Tarix",
        code: "TARIX101",
        initials: "AJ"
    },

    egamberdiyev: {
        name: "Egamberdiyev Bakhodir",
        shortName: "Bakhodir",
        subject: "IT",
        code: "IT202",
        initials: "EB"
    },

    valiyev: {
        name: "Valiyev Jamshid",
        shortName: "Jamshid",
        subject: "English",
        code: "ENG303",
        initials: "VJ"
    },

    karimova: {
        name: "Karimova Dilnoza",
        shortName: "Dilnoza",
        subject: "Turk tili",
        code: "TURK404",
        initials: "KD"
    },

    abdullayev: {
        name: "Abdullayev Sardor",
        shortName: "Sardor",
        subject: "Arab tili",
        code: "ARAB505",
        initials: "AS"
    }

};


/* =========================================
   STUDENT NAMES
========================================= */

const studentNames = [

    "Muhammadali Saidov",
    "Nilufar Abdullayeva",
    "Azizbek Sobirov",
    "Ziyoda Mamatova",
    "Jasur Karimov",
    "Madina Aliyeva",
    "Sardor Rahimov",
    "Malika Xasanova",
    "Abdulloh Ismoilov",
    "Shahzoda Karimova",
    "Bekzod Tursunov",
    "Mohira Ergasheva",
    "Diyorbek Qodirov",
    "Sevinch Raximova",
    "Oybek Nazarov",
    "Madina Yusupova",
    "Kamron Akbarov",
    "Gulnoza Sattorova",
    "Umidjon Rasulov",
    "Diyora Hamidova"

];


/* =========================================
   VARIABLES
========================================= */

let currentTeacher = null;

let students = [];

let assignments = [

    {
        title: "1-topshiriq",
        description: "Mavzu bo‘yicha asosiy topshiriq.",
        deadline: "30-sentabr, 2026",
        submitted: 14
    },

    {
        title: "2-topshiriq",
        description: "Amaliy mashg‘ulot topshirig‘i.",
        deadline: "2-oktabr, 2026",
        submitted: 11
    },

    {
        title: "Nazorat testi",
        description: "Mavzu bo‘yicha nazorat testi.",
        deadline: "5-oktabr, 2026",
        submitted: 17
    },

    {
        title: "Mustaqil ish",
        description: "Mustaqil bajariladigan topshiriq.",
        deadline: "7-oktabr, 2026",
        submitted: 9
    }

];


/* =========================================
   DOM
========================================= */

const loginPage =
    document.getElementById("loginPage");

const app =
    document.getElementById("app");

const teacherSelect =
    document.getElementById("teacherSelect");

const teacherCode =
    document.getElementById("teacherCode");

const loginBtn =
    document.getElementById("loginBtn");

const loginError =
    document.getElementById("loginError");


/* =========================================
   LOGIN
========================================= */

loginBtn.addEventListener("click", login);

teacherCode.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            login();
        }

    }
);


function login() {

    const selected =
        teacherSelect.value;

    const code =
        teacherCode.value.trim();


    if (!selected) {

        loginError.textContent =
            "Avval o‘qituvchini tanlang.";

        return;
    }


    if (!code) {

        loginError.textContent =
            "Kirish kodini kiriting.";

        return;
    }


    const teacher =
        teachers[selected];


    if (
        teacher &&
        code.toUpperCase() === teacher.code
    ) {

        currentTeacher = teacher;

        localStorage.setItem(
            "veloraTeacher",
            JSON.stringify(teacher)
        );

        startDashboard();

    } else {

        loginError.textContent =
            "Kirish kodi noto‘g‘ri.";

    }

}


/* =========================================
   START DASHBOARD
========================================= */

function startDashboard() {

    loginPage.classList.add("hidden");

    app.classList.remove("hidden");

    createStudents();

    updateTeacherUI();

    renderRecentStudents();

    renderStudents();

    renderAssignments();

    renderResults();

    renderAttendance();

    fillCertificateStudents();

    showToast(
        currentTeacher.shortName +
        ", VELORA Teacher Dashboard'ga xush kelibsiz!"
    );

}


/* =========================================
   AUTO LOGIN
========================================= */

const savedTeacher =
    localStorage.getItem("veloraTeacher");

if (savedTeacher) {

    try {

        currentTeacher =
            JSON.parse(savedTeacher);

        startDashboard();

    } catch {

        localStorage.removeItem(
            "veloraTeacher"
        );

    }

}


/* =========================================
   CREATE 20 STUDENTS
========================================= */

function createStudents() {

    students = studentNames.map(
        (name, index) => {

            let group;

            if (index < 5) {
                group = "1-kurs A";
            }

            else if (index < 10) {
                group = "1-kurs B";
            }

            else if (index < 15) {
                group = "2-kurs A";
            }

            else {
                group = "2-kurs B";
            }


            const parts =
                name.split(" ");

            const initials =
                parts
                    .slice(0, 2)
                    .map(
                        x =>
                            x[0].toUpperCase()
                    )
                    .join("");


            return {

                id: index + 1,

                name: name,

                initials: initials,

                group: group,

                result:
                    68 +
                    ((index * 7) % 31),

                attendance:
                    82 +
                    ((index * 3) % 18),

                status:
                    index === 3 ||
                    index === 12
                        ? "Kutmoqda"
                        : "Faol"

            };

        }
    );

}


/* =========================================
   UPDATE TEACHER UI
========================================= */

function updateTeacherUI() {

    const t = currentTeacher;


    document.getElementById(
        "teacherName"
    ).textContent =
        t.name;


    document.getElementById(
        "teacherSubject"
    ).textContent =
        t.subject;


    document.getElementById(
        "teacherAvatar"
    ).textContent =
        t.initials;


    document.getElementById(
        "headerTeacher"
    ).textContent =
        t.name;


    document.getElementById(
        "headerSubject"
    ).textContent =
        t.subject + " o‘qituvchisi";


    document.getElementById(
        "headerAvatar"
    ).textContent =
        t.initials;


    document.getElementById(
        "welcomeTeacher"
    ).textContent =
        t.shortName;


    document.getElementById(
        "welcomeSubject"
    ).textContent =
        t.subject.toUpperCase() +
        " O‘QITUVCHISI";


    document.getElementById(
        "studentsPageSubject"
    ).textContent =
        t.subject;


    document.getElementById(
        "assignmentSubject"
    ).textContent =
        t.subject;


    document.getElementById(
        "certificateSubject"
    ).textContent =
        t.subject;


    document.getElementById(
        "profileName"
    ).textContent =
        t.name;


    document.getElementById(
        "profileSubject"
    ).textContent =
        t.subject + " o‘qituvchisi";


    document.getElementById(
        "profileSubject2"
    ).textContent =
        t.subject;


    document.getElementById(
        "lessonSubject"
    ).textContent =
        t.subject;


    document.getElementById(
        "lessonSubject2"
    ).textContent =
        t.subject;


    document.getElementById(
        "lessonSubject3"
    ).textContent =
        t.subject;


    document.getElementById(
        "scheduleSubject1"
    ).textContent =
        t.subject;


    document.getElementById(
        "scheduleSubject2"
    ).textContent =
        t.subject;


    document.getElementById(
        "scheduleSubject3"
    ).textContent =
        t.subject;


    document.getElementById(
        "scheduleSubject4"
    ).textContent =
        t.subject;


    document.getElementById(
        "scheduleSubject5"
    ).textContent =
        t.subject;


    document.getElementById(
        "scheduleSubject6"
    ).textContent =
        t.subject;


    document.getElementById(
        "profileStudents"
    ).textContent =
        students.length;

}


/* =========================================
   NAVIGATION
========================================= */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );


const pageInfo = {

    dashboard: [
        "Bosh sahifa",
        "Ta’lim jarayonini boshqaring."
    ],

    students: [
        "O‘quvchilar",
        "O‘quvchilar faoliyatini nazorat qiling."
    ],

    assignments: [
        "Topshiriqlar",
        "Topshiriqlarni boshqaring."
    ],

    results: [
        "Natijalar",
        "O‘zlashtirish natijalarini ko‘ring."
    ],

    schedule: [
        "Dars jadvali",
        "Haftalik darslaringiz."
    ],

    attendance: [
        "Davomat",
        "O‘quvchilar davomatini boshqaring."
    ],

    certificates: [
        "Sertifikatlar",
        "O‘quvchilarga sertifikat yarating."
    ],

    profile: [
        "Profil",
        "O‘qituvchi profilingiz."
    ]

};


navItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                navigateTo(
                    item.dataset.page
                );

            }
        );

    }
);


function navigateTo(page) {

    document
        .querySelectorAll(".page")
        .forEach(
            p =>
                p.classList.remove(
                    "active"
                )
        );


    const selectedPage =
        document.getElementById(
            page + "Page"
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active"
        );

    }


    navItems.forEach(
        item => {

            item.classList.toggle(
                "active",
                item.dataset.page === page
            );

        }
    );


    if (pageInfo[page]) {

        document.getElementById(
            "pageTitle"
        ).textContent =
            pageInfo[page][0];


        document.getElementById(
            "pageDescription"
        ).textContent =
            pageInfo[page][1];

    }


    document
        .querySelector(".sidebar")
        .classList.remove("open");

}


/* =========================================
   RECENT STUDENTS
========================================= */

function renderRecentStudents() {

    const container =
        document.getElementById(
            "recentStudents"
        );

    container.innerHTML = "";


    students
        .slice(0, 10)
        .forEach(
            student => {

                container.innerHTML += `

                    <div class="recent-student">

                        <div class="recent-avatar">
                            ${student.initials}
                        </div>

                        <strong>
                            ${student.name}
                        </strong>

                        <small>
                            ${student.group}
                        </small>

                    </div>

                `;

            }
        );

}


/* =========================================
   RENDER STUDENTS
========================================= */

function renderStudents(
    list = students
) {

    const table =
        document.getElementById(
            "studentsTable"
        );

    table.innerHTML = "";


    list.forEach(
        student => {

            table.innerHTML += `

                <div class="student-row">

                    <span>
                        ${student.id}
                    </span>

                    <span class="student-name">

                        <i class="student-avatar">
                            ${student.initials}
                        </i>

                        ${student.name}

                    </span>

                    <span>
                        ${student.group}
                    </span>

                    <span>
                        ${student.result}%
                    </span>

                    <span>
                        ${student.attendance}%
                    </span>

                    <span>

                        <b class="badge ${
                            student.status === "Faol"
                                ? "active"
                                : "warning"
                        }">

                            ${student.status}

                        </b>

                    </span>

                </div>

            `;

        }
    );


    document.getElementById(
        "studentStat"
    ).textContent =
        students.length;


    document.getElementById(
        "totalStudents"
    ).textContent =
        students.length;


    document.getElementById(
        "studentMenuCount"
    ).textContent =
        students.length;

}


/* =========================================
   SEARCH
========================================= */

document
    .getElementById("studentSearch")
    .addEventListener(
        "input",
        filterStudents
    );


document
    .getElementById("groupFilter")
    .addEventListener(
        "change",
        filterStudents
    );


function filterStudents() {

    const search =
        document
            .getElementById(
                "studentSearch"
            )
            .value
            .toLowerCase();


    const group =
        document
            .getElementById(
                "groupFilter"
            )
            .value;


    const filtered =
        students.filter(
            student => {

                const nameMatch =
                    student.name
                        .toLowerCase()
                        .includes(search);


                const groupMatch =
                    group === "all" ||
                    student.group === group;


                return nameMatch && groupMatch;

            }
        );


    renderStudents(filtered);

}


/* =========================================
   ADD STUDENT
========================================= */

function addStudent() {

    const name =
        document
            .getElementById(
                "newStudentName"
            )
            .value
            .trim();


    const group =
        document
            .getElementById(
                "newStudentGroup"
            )
            .value;


    if (!name) {

        showToast(
            "O‘quvchi ismini kiriting."
        );

        return;

    }


    const parts =
        name.split(" ");


    const initials =
        parts
            .slice(0, 2)
            .map(
                x =>
                    x[0].toUpperCase()
            )
            .join("");


    students.push({

        id: students.length + 1,

        name: name,

        initials: initials,

        group: group,

        result: 0,

        attendance: 100,

        status: "Faol"

    });


    renderStudents();

    renderRecentStudents();

    fillCertificateStudents();

    document.getElementById(
        "newStudentName"
    ).value = "";


    closeModal(
        "studentModal"
    );


    showToast(
        "O‘quvchi muvaffaqiyatli qo‘shildi."
    );

}


/* =========================================
   ASSIGNMENTS
========================================= */

function renderAssignments() {

    const container =
        document.getElementById(
            "assignmentList"
        );

    container.innerHTML = "";


    assignments.forEach(
        assignment => {

            container.innerHTML += `

                <div class="assignment-card">

                    <small>
                        ${currentTeacher.subject}
                    </small>

                    <h3>
                        ${assignment.title}
                    </h3>

                    <p>
                        ${assignment.description}
                    </p>

                    <div class="assignment-bottom">

                        <span>
                            📅 ${assignment.deadline}
                        </span>

                        <b>
                            ${assignment.submitted}
                            ta topshirdi
                        </b>

                    </div>

                </div>

            `;

        }
    );


    document.getElementById(
        "assignmentStat"
    ).textContent =
        assignments.length;

}


/* =========================================
   ADD ASSIGNMENT
========================================= */

function addAssignment() {

    const name =
        document
            .getElementById(
                "newAssignmentName"
            )
            .value
            .trim();


    const date =
        document
            .getElementById(
                "newAssignmentDate"
            )
            .value;


    if (!name || !date) {

        showToast(
            "Topshiriq nomi va deadline kiriting."
        );

        return;

    }


    assignments.unshift({

        title: name,

        description:
            currentTeacher.subject +
            " fanidan yangi topshiriq.",

        deadline: date,

        submitted: 0

    });


    renderAssignments();

    closeModal(
        "assignmentModal"
    );


    document.getElementById(
        "newAssignmentName"
    ).value = "";


    document.getElementById(
        "newAssignmentDate"
    ).value = "";


    showToast(
        "Yangi topshiriq yaratildi."
    );

}


/* =========================================
   RESULTS
========================================= */

function renderResults() {

    const container =
        document.getElementById(
            "resultsTable"
        );

    container.innerHTML = `

        <div class="result-row"
             style="color:#555;font-weight:bold">

            <span>O‘quvchi</span>
            <span>Guruh</span>
            <span>Natija</span>
            <span>Holat</span>

        </div>

    `;


    students.forEach(
        student => {

            container.innerHTML += `

                <div class="result-row">

                    <span>
                        ${student.name}
                    </span>

                    <span>
                        ${student.group}
                    </span>

                    <span>
                        ${student.result}%
                    </span>

                    <span>

                        <b class="badge active">
                            Tekshirildi
                        </b>

                    </span>

                </div>

            `;

        }
    );


    const average =
        Math.round(
            students.reduce(
                (sum, s) =>
                    sum + s.result,
                0
            ) / students.length
        );


    document.getElementById(
        "averageStat"
    ).textContent =
        average + "%";


    document.getElementById(
        "resultAverage"
    ).textContent =
        average + "%";

}


/* =========================================
   ATTENDANCE
========================================= */

function renderAttendance() {

    const container =
        document.getElementById(
            "attendanceTable"
        );

    container.innerHTML = "";


    students.forEach(
        (student, index) => {

            let status;
            let className;


            if (index === 3) {

                status = "Kelmagan";
                className = "absent";

            }

            else if (index === 7) {

                status = "Kechikkan";
                className = "late";

            }

            else {

                status = "Kelgan";
                className = "present";

            }


            container.innerHTML += `

                <div class="attendance-row">

                    <span class="student-name">

                        <i class="student-avatar">
                            ${student.initials}
                        </i>

                        ${student.name}

                    </span>

                    <span>
                        ${student.group}
                    </span>

                    <span>

                        <b class="attendance-status ${className}">
                            ${status}
                        </b>

                    </span>

                </div>

            `;

        }
    );

}


/* =========================================
   CERTIFICATE
========================================= */

function fillCertificateStudents() {

    const select =
        document.getElementById(
            "certificateSelect"
        );

    select.innerHTML = "";


    students.forEach(
        student => {

            select.innerHTML += `

                <option value="${student.name}">
                    ${student.name}
                </option>

            `;

        }
    );

}


function createCertificate() {

    const select =
        document.getElementById(
            "certificateSelect"
        );


    const name =
        select.value;


    document.getElementById(
        "certificateStudentName"
    ).textContent =
        name;


    closeModal(
        "certificateModal"
    );


    navigateTo(
        "certificates"
    );


    showToast(
        "Sertifikat tayyorlandi."
    );

}


/* =========================================
   LESSON
========================================= */

function saveLesson() {

    closeModal(
        "lessonModal"
    );


    showToast(
        currentTeacher.subject +
        " darsi jadvalga qo‘shildi."
    );

}


/* =========================================
   MODALS
========================================= */

function openModal(id) {

    document
        .getElementById(id)
        .classList.add("show");

}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");

}


document
    .querySelectorAll(".modal")
    .forEach(
        modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        modal.classList.remove(
                            "show"
                        );

                    }

                }
            );

        }
    );


/* =========================================
   LOGOUT
========================================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "veloraTeacher"
            );

            currentTeacher = null;

            app.classList.add("hidden");

            loginPage.classList.remove(
                "hidden"
            );

            teacherSelect.value = "";
            teacherCode.value = "";

            loginError.textContent = "";

        }
    );


/* =========================================
   MOBILE MENU
========================================= */

document
    .getElementById("menuButton")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(".sidebar")
                .classList.add("open");

        }
    );


/* =========================================
   DATE
========================================= */

const dateInput =
    document.getElementById(
        "attendanceDate"
    );

dateInput.value =
    new Date()
        .toISOString()
        .split("T")[0];


document.getElementById(
    "todayDate"
).textContent =
    new Date().toLocaleDateString(
        "uz-UZ",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    document.getElementById(
        "toastText"
    ).textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}