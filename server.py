import web
render = web.template.render('templates/', base='layout')
r_cell = web.template.render('templates/cellular/', base='../layout') #WTF?
r_wave = web.template.render('templates/waves/', base='../layout') #WTF?
r_frac = web.template.render('templates/fractals/', base='../layout') #WTF?

urls = (
  '/', 'index',

  # automatons
  '/cellular/automata', 'cellular_automata',
  '/cellular/constructor', 'cellular_automata_constructor',

  # waves
  '/waves/points', 'waves_points',
  '/waves/interference', 'waves_interference',

  # fractals
  '/fractals/koch', 'frac_koch',
  '/fractals/cesaro', 'frac_cesaro',
  '/fractals/quadratic', 'frac_quadratic',

  # legacy urls
)

class index:
  def GET(self):
    return render.index()


class cellular_automata:
  def GET(self):
    return r_cell.cellular()

class cellular_automata_constructor:
  def GET(self):
    return r_cell.constructor()



class waves_points:
  def GET(self):
    return r_wave.points()

class waves_interference:
  def GET(self):
    return r_wave.interference()



class frac_koch:
  def GET(self):
    return r_frac.koch()

class frac_cesaro:
  def GET(self):
    return r_frac.cesaro()

class frac_quadratic:
  def GET(self):
    return r_frac.quadratic()



if __name__ == "__main__":
  app = web.application(urls, globals())
  app.run()
