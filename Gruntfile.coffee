module.exports = (grunt) ->

  grunt.initConfig
    pkg : grunt.file.readJSON 'package.json'
    
    connect:
      options:
        hostname: 'localhost'
        livereload: 35729
        port: 3000
      server:
        options:
          base: './app'
          open: true

    watch :
      options:
        livereload: '<%= connect.options.livereload'
        reload: true
      all:
        files:[
          'Gruntfile.coffee'
          'app/{,*/}*.*'
          ]

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'server', ->
    grunt.task.run 'connect:server'
    grunt.task.run 'watch:all'
    
  grunt.registerTask 'default', ->
    console.log 'this is the default task'