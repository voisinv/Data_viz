module.exports = (grunt) ->

  grunt.initConfig
    pkg : grunt.file.readJSON 'package.json'

    wiredep:
      options:
        cwd: './'
      target:
        src: './app/index.html'
        options:
          dependencies: true
    
    connect:
      options:
        hostname: 'localhost'
        livereload: 35728
        port: 3001
      server:
        options:
          base: ['./app', './']
          open: true

    watch :
      options:
        livereload: '<%= connect.options.livereload %>'
        reload: true
      all:
        files:[
          'Gruntfile.coffee'
          'bower.json'
          'app/index.html'
          'app/views/*.html'
          'app/scripts/{,*/}*.js'
          'app/style/{,*/}*.css'
          ]
        tasks:['wiredep', 'fileblocks']

    fileblocks:
      todos:
        src:'./app/index.html'
        blocks:
          app:
            src:[
              './app/scripts/app.js',
              './app/scripts/**/*.js'
              ]
          style:
            src: './app/style/**/*.css'

        
    coffee:
      compile:
        options:
          join: false
          bare:true
        files:[
          './app/scripts/services/datas.js':'./dev/scripts/services/datas.coffee'
          ]



  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-wiredep'
  grunt.loadNpmTasks 'grunt-file-blocks'

  grunt.registerTask 'server', ->
    grunt.task.run 'fileblocks'
    grunt.task.run 'wiredep'
    grunt.task.run 'connect:server'
    grunt.task.run 'watch:all'
    

  grunt.registerTask 'b', ->
    grunt.task.run 'coffee:glob_to_multiple'