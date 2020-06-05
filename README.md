<!-- 
todo make cards draggable
 -->
# CLI Team Builder
A CLI app to build a software engineering team. The application prompts the user for information about the various team members. Leveraging Inquirer, the user can input any number of team members, and they may be a mix of managers, engineers and interns. When all members have been defined the app generates an HTML webpage that displays summaries for each person. Provides a clean UI for simple user input & offers JSON import for larger teams. This app runs in a Node environment.

<p align="center">
   <img width="80%" height="350vh" src="./images/terminal.png">
   <img width="80%" height="350vh" src="./images/browser.png">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Lc5zUFDXzLw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

## Installation & Getting Started

1. Clone from the [Repo](https://github.com/Spazcool/team-builder), install modules & run app: 

  ```
  git clone https://github.com/Spazcool/team-builder.git
  ```
2. Install dependencies:
  ```
  npm install
  ```
3. Run:
  * Build the team via CLI:
    ```
    npm run build-team
    ```
  * Build the team via JSON import:
    ```
    npm run build-team {path/to/file.json} {team name}
    ```

## Prerequisites

* Node.js

## Built With

* Node
* Inquirer
* axios
* fs
* GitHub API
* Bootstrap

## Examples

* [Example Import JSON](https://github.com/Spazcool/team-builder/tree/master/data/example.json)
* [Example Output (Hosted)](http://www.spazcool.com/team-builder/index.html)
* [Example Output (Raw)](https://github.com/Spazcool/team-builder/blob/master/index.html)

## Authors

* **Douglas Wright** - [Spazcool](https://github.com/Spazcool)

## Acknowledgements

* [Sticky Footer](https://getbootstrap.com/docs/4.0/examples/sticky-footer/) 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.