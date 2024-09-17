class CalorieTracker
{
  
  constructor()
  {
    this._calorieLimit = 2001;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = []; 
    //constructor runs immediately when you instantiate the class//

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();

  }


  //these are public methods//
  
  addMeal(meal)
  {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render()
  }

  addWorkout(workout)
  {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }


  //private methods//

  _displayCaloriesTotal()
  {
    const totalCaloriesEl = document.getElementById('calories-total') //el for element
    totalCaloriesEl.innerHTML = this._totalCalories;
  }


  _displayCaloriesLimit()
  {
    const calorieLimitEl = document.getElementById('calories-limit') //el for element
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed()
  {
    const caloriesConsumedEl = document.getElementById('calories-consumed');

    const consumed = this._meals.reduce((total,meal) => total + meal.calories, 0);

    caloriesConsumedEl.innerHTML = consumed;
  }


  _displayCaloriesBurned()
  {
    const caloriesBurnedEl = document.getElementById('calories-burned');

    const burned = this._workouts.reduce((total,workout) => total + workout.calories, 0);

    caloriesBurnedEl.innerHTML = burned;
  }


  _displayCaloriesRemaining()
  {
    const caloriesRemainingEl = document.getElementById('calories-remaining');

    const progressEl = document.getElementById('calorie-progress');

    const remaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEl.innerHTML = remaining;

    if(remaining <= 0)
    {
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');//trying to access the parent elements based on the html
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');


      progressEl.classList.add('bg-danger');
      progressEl.classList.remove('bg-sucess');

    }
    else
    {
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');

      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }


  _displayCaloriesProgress()

  {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`
  }
  _render() 
  {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

  class Meal 
{ 
    constructor(name,calories)

    {
      this.id = Math.random().toString(16).slice(2);
      this.name = name;
      this.calories = calories;
    }  
    
}

  class Workout 
{ 
    constructor(name,calories)

    {
      this.id = Math.random().toString(16).slice(2);
      this.name = name;
      this.calories = calories;
    }  


}


const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 500);

const lunch = new Meal('lunch', 5550);
tracker.addMeal(breakfast);
tracker.addMeal(lunch);

const run = new Workout('Morning Run', 400);


tracker.addWorkout(run);

console.log(tracker._meals);

console.log(tracker._workouts);

console.log(tracker._totalCalories);

//console.log(Math.random()).toString(16).slice(2);