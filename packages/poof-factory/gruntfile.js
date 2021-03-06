'use strict';

const loadGruntTasks = require('load-grunt-tasks');
const rollupPluginBabel = require('rollup-plugin-babel');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');


module.exports = function register(grunt) {
  loadGruntTasks(grunt);

  grunt.initConfig({
    eslint: {
      all: ['lib', 'test'],
    },

    clean: {
      all: ['dist'],
    },

    rollup: {
      all: {
        options: {
          external: [
            'field-validation-error',
            'validator',
          ],
          plugins: [
            rollupPluginNodeResolve({ extensions: [] }),
            rollupPluginBabel(),
          ],
          format: 'cjs',
        },
        files: {
          'dist/poof_factory.js': 'lib/poof_factory.js',
        },
      },
    },

    babel: {
      all: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: '**/*.js',
          dest: 'tmp/',
        }],
      },
    },

    mochaTest: {
      test: {
        options: {
          timeout: 500,
        },
        src: [
          'test/boot.js',
          'test/**/*.test.js',
        ],
      },
    },
  });

  grunt.registerTask('prepublish', ['eslint', 'clean', 'rollup']);
  grunt.registerTask('test', ['prepublish', 'babel', 'mochaTest']);

  grunt.registerTask('default', ['test']);
};
