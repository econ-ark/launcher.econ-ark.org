// Launches a new notebook window with correctly formatted URL depending on platform
function launchNotebook(url, platform) {
  const notebookPath = url.replace('https://github.com/', '').split('/');

  var ghUser, ghRepo, ghBranch, ghFilePath, customURL;

  ghUser = notebookPath[0];
  ghRepo = notebookPath[1];
  ghBranch = notebookPath[3];
  ghFilePath = notebookPath[4];

  for (var i = 5; i < notebookPath.length; i++) {
    ghFilePath = ghFilePath + '/' + notebookPath[i];
  }

  var binderURL =
    'https://mybinder.org/v2/gh/' +
    ghUser +
    '/' +
    ghRepo +
    '/' +
    ghBranch +
    '?filepath=' +
    ghFilePath;

  var customLauncherDomain = document.getElementById('customLauncherDomain')
    .textContent;

  var econarkURL =
    customLauncherDomain +
    ghUser +
    '/' +
    ghRepo +
    '/' +
    ghBranch +
    '?filepath=' +
    ghFilePath;

  if (platform == 'econark') {
    customURL = econarkURL;
  } else {
    customURL = binderURL;
  }

  window.open(customURL);
}

// Prevent default form submission
document.getElementById('launcher').addEventListener('submit', function(e) {
  e.preventDefault();
});

// Attach launchNotebook on click to each launcher button
var launcherButtons = document.querySelectorAll('#launcher button');
for (var i = 0; i < launcherButtons.length; i++) {
  launcherButtons[i].addEventListener('click', function() {
    var url = document.getElementById('notebookURLInput').value;
    if (url != '') {
      var platform = this.value;
      launchNotebook(url, platform);
    }
  });
}
