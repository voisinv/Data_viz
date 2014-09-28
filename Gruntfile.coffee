module.exports = (grunt) ->

  grunt.initConfig
    pkg : grunt.file.readJSON 'package.json'
    
    wiredep:
      options:
        cwd: './bower_components'
      target:
        src: './app/index.html'
        directory: './'
        options:
          dependencies: true
    
    connect:
      options:
        hostname: 'localhost'
        livereload: 35729
        port: 3000
      server:
        options:
          base: ['./app', './bower_components']
          open: true

    watch :
      options:
        livereload: '<%= connect.options.livereload %>'
        reload: true
      all:
        files:[
          'Gruntfile.coffee'
          'bower.json'
          'app/{,*/}*.*'
          ]
        tasks:'wiredep'


  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-wiredep'

  grunt.registerTask 'server', ->
    grunt.task.run 'connect:server'
    grunt.task.run 'watch:all'
    
  grunt.registerTask 'default', ->
    console.log 'this is the default task'

  grunt.registerTask 'b', ->
    grunt.task.run 'wiredep:target'