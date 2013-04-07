Package.describe({
  summary: "Attempt to add Aggregate support to minimongo collection"
});

Npm.depends({mongodb: "1.2.14"});


Package.on_use(function (api) {
  api.add_files("mongowrapper.js", "server");
});