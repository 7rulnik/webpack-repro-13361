const NullDependency = require('webpack/lib/dependencies/NullDependency')

class ModifyDependency extends NullDependency {}

ModifyDependency.Template = class ModifyDependencyTemplate extends NullDependency.Template {
  apply(dependency, source) {
    console.log('ModifyDependency.Template.apply() was called')
    source.insert(Infinity, '\nconsole.log("Inserted console.log")')
  }
};

module.exports = class ModifyPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('ModifyPlugin', (compilation) => {
      compilation.dependencyTemplates.set(
        ModifyDependency,
        new ModifyDependency.Template(this.patterns)
      );
      compilation.hooks.buildModule.tap('ModifyPlugin', (module) => {
        module.addDependency(new ModifyDependency(module));
      });
    });
  }
};
