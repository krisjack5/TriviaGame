var quiz = [	
	
	{
		question: "This state was not one of the 13 original colonies",
		answers: ["New Jesrey", "Delaware", "Georgia", "Maine"],
		correctAnswer: 3,
		
		
	},
	
	{
		question: "The Whitehouse was burned down during this war",
		answers: ["Civil War", "War of 1812", "WWII", "Spanish-American War"],
		correctAnswer: 1, 
		
		
	},
	
	{
		question: "George Washignton crossed this river on his way to victory at the Battle of Princeton",
		answers: ["Mississpisi River", "Hudson River", "Delaware River", "Potomac River"],
		correctAnswer: 2, 
		
		
	},
	
	{
		question: "Who served as the first ambassador to France?",
		answers: ["Thomas Jefferson", "Herby Hancock", "Ben Franklin", "Pierre St. Paul"],
		correctAnswer: 2, 
		
		
	},
	
];


var Time = 
{
	
	begin: 10,
	present: 10, 
	inter: "",
	on: false,

	
	Start: function()
	{
		if (!Time.on) 
		{
			Time.inter = setInterval(Time.Count, 1000) 
			Time.on = true;
		}
	},

	Count: function()
	{
		Time.present--;

		if (Time.present < 1)
		{
			Time.present = 0;
			Time.Stop();
		}
		
		if (Time.present === 1)
			$("#clock").html("Time Left: " + Time.present + " seconds left");
		else
			$("#clock").html("Time Left: " + Time.present + " seconds left");
		
	},

	Stop: function()
	{
		clearInterval(Time.inter);
		Time.on = false;
	},

	Reset: function()
	{
		Time.present = Time.begin;
	}
};


var play = {
	
	picked: "",
	right: 0,
	wrong: 0,
	missed: 0,
	current: 0,
	ans: "",
	nex: "",

	
	ShowQuestion: function() 
	{
		
		var box = quiz[play.current]; 
		$("#question").html(box.question);
		$("#one").html(box.answers[0]);
		$("#two").html(box.answers[1]);
		$("#three").html(box.answers[2]);
		$("#four").html(box.answers[3]);

		
		if (play.current === 0)
			$("#start").addClass("gone");
		else
			$("#choice").addClass("gone");

		
		$("#main").removeClass("gone");
	},

	ShowAnswer: function()
	{
		
		var box = quiz[play.current];

		
		if (Time.present < 1) 
		{
			$("#result").html("Time's Up!");
			$("#answer").html("The answer was: " + box.answers[box.correctAnswer]);
			play.missed++;
		}
		else
		{
			if (play.picked === box.answers[box.correctAnswer]) 
			{
				$("#result").html("Keep up the good work");
				$("#answer").html(""); 
				play.right++;
			}
			else 
			{
				$("#result").html("Loser");
				$("#answer").html("The answer was: " + box.answers[box.correctAnswer]);
				play.wrong++;
			}
		}

		$("#main").addClass("gone");

		
		$("#choice").removeClass("gone");
	},

	Score: function() 
	{
		
		$("#correct").html(play.right);
		$("#wrong").html(play.wrong);
		

		
		$("#choice").addClass("gone");

		
		$("#score").removeClass("gone");
		$("#restart").removeClass("gone");
	},

	Reset: function()
	{
		play.picked = "";
		play.right = 0;
		play.wrong = 0;
		play.current = 0;
	},

	Next: function() 
	{
		if (play.current > quiz.length - 1)
		{
			$("#clock").addClass("hidden");
			play.Score();
		}
		else
		{
			$("#clock").html("Time Left: " + Time.begin + " seconds");
			Time.Reset();
			Time.Start();
			play.ShowQuestion();

			play.ans = setTimeout(play.ShowAnswer, Time.present * 1000);

			play.nex = setTimeout(function()
			{
				play.current++;
				play.Next();
			}, 
			Time.present * 3000);

		}
	}
};


$(document).ready(function()
{
	$("#start").click(function()
	{
		$("#clock").removeClass("gone");
		play.Next();
	});

	$(".select").click(function()
	{
		Time.Stop();

		clearTimeout(play.ans);
		clearTimeout(play.nex);

		play.picked = $(this).html();
		play.ShowAnswer();
		play.current++;
		setTimeout(play.Next, 2000);
	});

	$("#restart").click(function()
	{
		play.Reset();
		$("#score").addClass("gone");
		$(this).addClass("gone");
		$("#clock").removeClass("gone");
		play.Next();
	});
})

	
	


 


