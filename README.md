The files included:
* index.html: main page
* script.js: main page JS scripts.
* style.css: main page style
* detail_page.html: detail page HTML
* detail_script.js: detail page script
* detail_style.css: detail page style file
* eng-climate-summary.csv: sample data file.
* README.md: this file

Steps to compile in Maven:
* Incorparate the code into proper project directory, e.g: src/main/javascript/... and scr/test/javascript/...
* pom.xml is prepated to have required plug-ins for execution and testing.
* mvn install

To Run the solution, follow the steps:
* Load the data file by clicking the "Choose File" button, select the required CVS data file, e.g: "eng-climate-summary.cvs"
* Specify the data to be filtered in, if needed; in the required format in the two date fields.
* Click "Upload" button to have the data populated; another window page should appear, and ready for detailed data next.
* Select any Mean_Temp cell in the Main page to have the deatailed data populated in the Details page.

GitHub repository:
https://github.com/phvnguyen/JavaTakeHomeQuiz

Online code experimenting:
http://embed.plnkr.co/3uGBS9wHOufsaf52vZCb/
