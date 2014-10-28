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
        livereload: 35729
        port: 3000
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
          './app/scripts/app.js':'./dev/scripts/app.coffee'
          './app/scripts/controllers/*.js':'./dev/scripts/controllers/*.coffee'
          ]
      glob_to_multiple:
        expand: true,
        flatten: true,
        cwd: ['./dev/scripts/', './dev/scripts/controllers/']
        src: '*.coffee',
        dest: ['./app/scripts/', '.app/scripts/controllers']
        ext: '.js'

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