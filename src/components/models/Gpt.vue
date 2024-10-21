<script setup lang="ts">

</script>

<template>
<!DOCTYPE html>
    <div class="resume">
        <div class="header">
            <h1>James Moriarty</h1>
            <img src="https://i0.wp.com/statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg?ssl=1" alt="Profile Picture">
        </div>
        <div class="contact">
            <p>Cell: 555-686-7777</p>
            <p>Web: moriarty.com</p>
            <p>Email: napoleon@crime.com</p>
        </div>
        <div class="summary">
            <p>I am a reserved but ambitious young professional seeking a career that fits my professional skills, personality, and murderous tendencies. My good birth, excellent education and phenomenal mathematical faculty have allowed me to advance the prospects of several criminal enterprises.</p>
        </div>
        <div class="content">
            <div class="section">
                <h2>Education</h2>
                <p><strong>Oxford University</strong><br>
                Major: Applied Mathematics<br>
                Minor: Romance Languages</p>
            </div>
            <div class="section">
                <h2>Skills</h2>
                <p><strong>Office Skills</strong><br>
                Office and records management, database administration, event organization, customer support, travel coordination</p>
                <p><strong>Computer Skills</strong><br>
                Microsoft productivity software (Word, Excel, etc), Adobe Creative Suite, Windows</p>
            </div>
            <div class="section">
                <h2>Experience</h2>
                <p><strong>Consulting Criminal</strong><br>
                London 1892 – present<br>
                - Development within the criminal underworld<br>
                - Conducted negotiations with several rogue governments</p>
                <p><strong>The Coldstream Guards</strong><br>
                Army Coach, London 1889 – 1888<br>
                - Recruiting, training and terrorizing young men</p>
                <p><strong>Oxford University</strong><br>
                Professor of Mathematics 1885 – 1888<br>
                - Published papers in binomials, asteroid dynamics and game theory<br>
                - Intimidated students</p>
            </div>
            <div class="section">
                <h2>Hobbies</h2>
                <p>World domination, Social Manipulation, Murder Most Foul</p>
            </div>
            <div class="section">
                <h2>References</h2>
                <p>Available on request</p>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.resume {
    width: 800px;
    margin: 50px auto;
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #000;
    padding-bottom: 10px;
}

.header h1 {
    margin: 0;
}

.header img {
    border: 1px solid #000;
    padding: 3px;
    width: 100px;
    height: 100px;
}

.contact {
    text-align: right;
    margin-top: 10px;
}

.summary {
    margin: 20px 0;
}

.content {
    display: flex;
    flex-direction: column;
}

.section {
    margin-bottom: 20px;
}

.section h2 {
    border-bottom: 2px solid #000;
    display: inline-block;
    margin-bottom: 10px;
}

.section p {
    margin: 5px 0;
}

</style>