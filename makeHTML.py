from jinja2 import Template
import codecs
import markdown
from bs4 import BeautifulSoup
import mistletoe
from mistletoe.latex_renderer import LaTeXRenderer
import os

class makeHTML:
    mdFile = None
    blogInfo = []
    Paragraph = []
    indexFile = None
    num = 11

    def __init__(self):
        pass
    
    def getTitle(self, order):
        self.blogInfo = []
        self.Paragraph = []
        self.mdFile = open('blog/' + str(order) + '.md')
        while True:
            line = self.mdFile.readline()
            if not line:
                break
            self.Paragraph.append(line)
        
        for i in range(0, 4):
            self.blogInfo.append(self.Paragraph[i])
        self.mdFile.close()
    
    def getInform(self, myStr):
        isStrong = False
        isItalic = False
        isStrike = False
        isEmphasis = False
        newS = '''<span class = "normal">'''
        mLen = len(myStr)
        i = 0

        spaceLen = 0
        for j in myStr:
            if j == ' ':
                spaceLen += 1
            else:
                break

        if mLen > spaceLen + 2 and myStr[spaceLen:spaceLen + 2] == '- ':
            for j in range(0, spaceLen):
                newS += '&nbsp&nbsp'
            newS += ' ♦ '
            i = spaceLen + 2

        while i < mLen:
            ch = myStr[i]
            if ch == ' ':
                newS += '&nbsp&nbsp'
            elif ch == '*':
                if i + 1 < mLen and myStr[i + 1] == '*':
                    if not isStrong:
                        newS += '''<span class = "strong">'''
                        isStrong = True
                        i += 1
                    else:
                        newS += '''</span>'''
                        isStrong = False
                        i += 1
                else:
                    if not isItalic:
                        newS += '''<span class = "italic">'''
                        isItalic = True
                    else:
                        newS += '''</span>'''
                        isItalic = False
            elif ch == '<' and i + 2 < mLen and myStr[i + 1] == 'u' and myStr[i + 2] == '\>':
                newS += '''<span class = "underline">'''
                i += 2
            elif ch == '<' and i + 3 < mLen and myStr[i + 1] == '/' and myStr[i + 2] == 'u' and myStr[i + 3] == '\>':
                newS += '''</span>'''
                i += 3
            elif ch == '`':
                if isEmphasis == False:
                    newS += '''<span class = "emphasis">'''
                    isEmphasis = True
                else:
                    newS += '''</span>'''
                    isEmphasis = False
            elif ch == '~'  and i + 1 < mLen and myStr[i + 1] == '~':
                if not isStrike:
                    newS += '''<span class = "strike">'''
                    isStrike = True
                    i += 1
                else:
                    newS += '''</span>'''
                    isStrike = False
                    i += 1
            else:
                newS += ch
            i += 1
        newS += '</span>'
        return newS

            

    def pHtml(self, order):
        if not os.path.exists('blog/' + str(order) + '.md'):
            self.blogInfo[0] = '并没有找到你的第 ' + str(order) + ' 个可爱的文件 ヾ(◍°∇°◍)ﾉﾞ\n'
            self.blogInfo[1] = 'Article\n'
            self.blogInfo[2] = '也没有找到简介在哪\n'
            self.blogInfo[3] = '1989 / 6 / 4\n'
            return

        self.getTitle(order)
        outFIle = open('blog/' + str(order) + '.html', 'w')
        outFIle.write('''
<!doctype html>
<html lang = "en">
    <head>
        <!-- Required meta tags -->
        <meta charset = "utf-8">
        <meta name = "viewport" content = "width = device-width, initial-scale = 1, shrink-to-fit = no">

        <!-- Bootstrap CSS -->
        <link rel = "stylesheet" href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity = "sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin = "anonymous">
        <link rel = "stylesheet" href = "../css/home.css">
        <link rel = "stylesheet" href = "../css/blog.css">

        <link rel = "icon" href = "../img/favicon.ico" mce_href = "../img/favicon.ico" type = "image/x-icon">
        <link rel = "shortcut icon" href = "../img/favicon.ico" mce_href = "../img/favicon.ico" type = "image/x-icon">

        <title>MITSUYAMA | %s</title>
    </head>
    
    <body>
        <div class = "container-fluid" id = "blogBackground">
            <img src = "../img/%d.jpg" class = "blogTitleImg">
            <div class = "glass"></div>
            <div class = "blogTitle">
                %s
            </div>
            <div class = "tagContainer">
                Tag：%s
            </div>
        </div>

        <div class = "nevigation">
            <div class = "nevigation_content1">
                <a href = "http://mitsuyama.top" style = "color: #999999">
                <div class = "nav_text_home">
                    HOME
                </div>
                </a>            
            </div>
            <div class = "navigation_content2">
                <a href = "about.html" style = "color: #999999">
                <div class = "nav_text">
                    About
                </div>
                </a>
                <div class = "nav_text">
                    Blog
                </div>
                <a href = "https://github.com/Mittsuyama" style = "color: #999999">
                <div class = "nav_text">
                    GitHub
                </div>
                </a>
                <div class = "nav_text">
                    Search
                </div>
            </div>
        </div>

        <div class = "blogMainBlock">
            <div class = "articleContext">
        ''' % (self.blogInfo[0], order, self.blogInfo[0], self.blogInfo[1]))

        pLen = len(self.Paragraph)
        for i in range(5, pLen):
            line = self.Paragraph[i]
            if len(line) > 5 and line[:5] == '#####':
                outFIle.write('''                <div class = "h5">''' + line[5 : -1] + '''</div>''' + '\n')
                if i + 1 < pLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif len(line) > 4 and line[:4] == '####':
                outFIle.write('''                <div class = "h4">''' + line[4 : -1] + '''</div>''' + '\n')
                if i + 1 < pLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif len(line) > 3 and line[:3] == '###':
                outFIle.write('''                <div class = "h3">''' + line[3 : -1] + '''</div>''' + '\n')
                if i + 1 < pLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif len(line) > 2 and line[:2] == '##':
                outFIle.write('''                <div class = "h2">''' + line[2 : -1] + '''</div>''' + '\n')
                if i + 1 < pLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif len(line) > 1 and line[:1] == '#':
                pass
                #outFIle.write('''                <div class = "h1">''' + line[1 : -1] + '''</div>''' + '\n')
                if i + 1 < pLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif len(line) > 1 and line[:1] == '>':
                outFIle.write('''                <div class = "quote">''' + line[1 : -1] + '''</div>''' + '\n')
                if i + 1 < pLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif len(line) > 3 and line[:3] == 'Tag':
                if i + 1 < pLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif len(line) > 5 and line[:5] == '[TOC]':
                if i + 1 < pLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif line[0] == '[' and line[-2] == ')':
                context = ''
                href = ''
                tempPos = 1
                while True:
                    if line[tempPos] == ']':
                        break
                    context += line[tempPos]
                    tempPos += 1
                tempPos += 2
                while True:
                    if line[tempPos] == ')':
                        break
                    href += line[tempPos]
                    tempPos += 1
                outFIle.write('''                <a href = "%s" class = "conncetion">''' % (href) + context + '''</a>''' + '\n')
            elif line[0:2] == '![' and line[-2] == ')':
                context = ''
                href = ''
                tempPos = 2
                while True:
                    if line[tempPos] == ']':
                        break
                    context += line[tempPos]
                    tempPos += 1
                tempPos += 2
                while True:
                    if line[tempPos] == ')':
                        break
                    href += line[tempPos]
                    tempPos += 1
                outFIle.write('''                <img src = "%s" class = "blogImg">''' % (href) + '\n')
            elif line[0] == '\n':
                outFIle.write('''                <br>''' + '\n')
            elif len(line) > 3 and line[:3] == '---':
                outFIle.write('''                <hr>''' + '\n')
            else:
                outFIle.write('                ' + self.getInform(line[:-1]) + '\n')
                outFIle.write('''                <br>''' + '\n')
            
        outFIle.write('''
            </div>

        <div class = "feet">
            <div class = "copyrigt">MITSUYAMA © 2018</div>
            <div class = "callme">Email MITSUYAMA@163.com</div>
        </div>

        </div>



        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src = "https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity = "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin = "anonymous"></script>
        <script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity = "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin = "anonymous"></script>
        <script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity = "sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin = "anonymous"></script>
        <script src = "../js/blog.js"></script>
        <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
        <script type="text/x-mathjax-config">
            MathJax.Hub.Config({
                tex2jax: {inlineMath: [['$','$']]}
                });
            </script>
    </body>
</html>''')

    def main(self):
        #start = input()
        #end = input()
        self.indexFile = open('index.html', 'w')
        self.indexFile.write('''
<!doctype html>
<html lang = "en">
    <head>
        <!-- Required meta tags -->
        <meta charset = "utf-8">
        <meta name = "viewport" content = "width = device-width, initial-scale = 1, shrink-to-fit = no">

        <!-- Bootstrap CSS -->
        <link rel = "stylesheet" href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity = "sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin = "anonymous">
        <link rel = "stylesheet" href = "css/home.css">
        <link rel = "stylesheet" href = "css-loader/css/style.css">

        <link rel = "icon" href = "img/favicon.ico" mce_href = "img/favicon.ico" type = "image/x-icon">
        <link rel = "shortcut icon" href = "img/favicon.ico" mce_href = "img/favicon.ico" type = "image/x-icon">

        <title>MITSUYAMA | SITE</title>
    </head>
    
    <body>
        <div class = loading>
            <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            </div>
        </div>      
 
        <div clas = "container-fluid" id = "homeBackground">
            <div class = "homeTitle">
                MITSUYAMA | SITE
            </div>
        </div>

        <div class = "nevigation">
            <div class = "nevigation_content1">
                <a href = "http://mitsuyama.top" style = "color: #999999">
                <div class = "nav_text_home">
                    HOME
                </div>
                </a>        
            </div>
            <div class = "navigation_content2">
                <a href = "blog/about.html" style = "color: #999999">
                <div class = "nav_text">
                    About
                </div>
                </a>
                <div class = "nav_text">
                    Blog
                </div>
                <a href = "https://github.com/Mittsuyama" style = "color: #999999">
                <div class = "nav_text">
                    GitHub
                </div>
                </a>
                <div class = "nav_text">
                    Search
                </div>
            </div>
        </div>

        <div class = "home_background">
            <div class = "text_container">
''')
        for i in range(1, self.num + 1):
            self.pHtml(i)
            self.indexFile.write('''
                <a href = "blog/%d.html">
                    <button class = "box">
                        <div class = "boxUp">
                            <img src = "img/%d.jpg" class = "boxUpImg">
                            <div class = "briefIntro">
                                <p class = "briefIntroContext">%s</p>
                            </div>
                            <div class = "sawNumBox">
                                <img src = "img/eye.png" class = "eyeImg">
                                <p class = "sawNum">%s</p>
                            </div>
                        </div>
                        <div class = "boxInter"></div>
                        <div class = "boxDown">
                            <div class = "inf1">
                                <p class = "infoText">%s</p>
                            </div>
                            <div class = "inf2">
                                <p class = "tagText">%s</p>
                                <a href = "#"></a>
                            </div>
                        </div>
                    </button>
                </a>''' % (i, i, self.blogInfo[2][:-1], self.blogInfo[3][:-1], self.blogInfo[0][:-1], self.blogInfo[1][:-1]))
        
        self.indexFile.write('''
            </div>
        </div>

        <div class = "feet">
            <div class = "copyrigt">MITSUYAMA © 2018</div>
            <div class = "callme">Email MITSUYAMA@163.com</div>
        </div>

        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src = "https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity = "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin = "anonymous"></script>
        <script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity = "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin = "anonymous"></script>
        <script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity = "sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin = "anonymous"></script>
        <script src = "js/home.js"></script>
        <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    </body>
</html>''')

if __name__ == '__main__':
    makeHTML().main()