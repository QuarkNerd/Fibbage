<script lang="ts">
	import { Header } from '$lib/components';
    import './style.css';
</script>

<Header header="Fibbage" />
<div class="main">
    Welcome to Fibbage with custom questions. In this game you try to trick your friends while finding the real answer yourselves. 
    
    <h3> Join a game</h3>
    To create a new game click <a href="./create-game">here</a>, to join an existing game ask someone to send you the link.

    <h3> How to play? </h3>
    <div class="box">
        In each round you are presented with a question. 
        <br>
        <br>
        The first thing to do is to create a convincing lie. If you know the real answer, don't use it or something too close to it as that volates the spirit of the game. 
        <br>
        <br>
        Then once everyone has submitted the lie, choose what you think is the correct option. 
        <br>
        <br>
        You will earn points for getting the question right and for everyone who chooses your answer.  
    </div>
</div>

<style>
h3 {
    margin-bottom: 0px;
}
</style>