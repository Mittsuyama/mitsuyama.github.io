import codecs
import os

class makeHTML:
    mdFile = None
    blogInfo = []
    Paragraph = []
    indexFile = None
    fileName = []
    homeTemp = []
    homeBttonTemp = []
    blogTemp = []
    num = 0

    def __init__(self):
        path = 'md/'  #待读取的文件夹
        path_list = os.listdir(path)
        path_list.sort() #对读取的路径进行排序
        for theName in path_list:
        	self.fileName.append(os.path.join(path,theName))
        self.num = len(path_list)
        self.homeTemp = open('templates/index.html').read()
        self.blogTemp = open('templates/blog.html').read()
        self.homeBttonTemp = open('templates/homeButton.html').read()

    def getTitle(self, order):
        self.blogInfo = []
        self.Paragraph = []
        self.mdFile = open(self.fileName[order])
        filePoint = 0
        while True:
            line = self.mdFile.readline()
            if not line:
                break
            filePoint += 1
            if filePoint > 4:
                self.Paragraph.append(line)
            else:
                 self.Paragraph.append(line)
        
        self.Paragraph[-1] += ' '
        
        for i in range(0, 4):
            self.blogInfo.append(self.Paragraph[i])
        self.mdFile.close()
    
    def getInform(self, myStr):
        isStrong = False
        isItalic = False
        isStrike = False
        isEmphasis = False
        newS = ''
        mLen = len(myStr)
        i = 0

        spaceLen = 0
        for j in myStr:
            if j == ' ':
                spaceLen += 1
            else:
                break

        newS += '''<span class = "normal">'''

        if mLen > spaceLen + 2 and myStr[spaceLen:spaceLen + 2] == '- ':
            for i in range(0, spaceLen):
                newS += '&nbsp&nbsp&nbsp'
            i = spaceLen + 2
            newS += '◇&nbsp&nbsp'

        while i < mLen:
            ch = myStr[i]
            if ch == ' ':
                newS += '&nbsp'
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
        newS += '''</span>'''
        return newS

            

    def pHtml(self, order):
        isQuote = False
        self.getTitle(order)
        outFIle = open('blog/' + str(order) + '.html', 'w')
        blogHtml = self.blogTemp
        blogHtml = blogHtml.replace('((siteTitle))', self.blogInfo[0])
        blogHtml = blogHtml.replace('((Title))', self.blogInfo[0])
        blogHtml = blogHtml.replace('((Tag))', self.blogInfo[1])
        blogHtml = blogHtml.replace('((blogTitleImg))', str(order))
        blogContent = ''

        tempOrder = 0
        for j in self.Paragraph:
            if len(j) > 5 and j[:4] == '####':
                tempOrder += 1
                blogContent += '''                <a href = "%s" class = "conncetion" style = "padding-left: 80px;">''' % ('#' + str(tempOrder)) + j[5:-1].replace(' ', '&nbsp&nbsp') + '''</a><br>''' + '\n'
            elif len(j) > 4 and j[:3] == '###':
                tempOrder += 1
                blogContent += '''                <a href = "%s" class = "conncetion" style = "padding-left: 40px;">□''' % ('#' + str(tempOrder)) + j[3:-1].replace(' ', '&nbsp&nbsp') + '''</a><br>''' + '\n'
            elif len(j) > 3 and j[:2] == '##':
                tempOrder += 1
                blogContent += '''                <a href = "%s" class = "conncetion">▷''' % ('#' + str(tempOrder)) + j[2:-1].replace(' ', '&nbsp&nbsp') + '''</a><br>''' + '\n'

        pLen = len(self.Paragraph)
        i = 5
        while i < pLen:
            line = self.Paragraph[i]
            lLen = len(line)
            if lLen > 3 and line[:3] == '```':
                if(lLen > 4):
                    blogContent += '''                <pre><code class = "%s">''' % (line[3 : -1]).replace('<', '&lt;').replace('>', '&gt;') + '\n'
                else:
                    blogContent += '''                <pre><code class = "nohighlight">''' + '\n'
                while True:
                    i += 1
                    if len(self.Paragraph[i]) > 3 and self.Paragraph[i][:3] == '```':
                        break
                    blogContent += self.Paragraph[i]
                blogContent += '''                </code></pre>''' + '\n'
                i += 1
            elif lLen > 2 and line[:2] == '$$':
                #outFIle.write('''                <pre class = "codeBlock">''' + '\n')
                blogContent += '$$\n'
                while True:
                    i += 1
                    if len(self.Paragraph[i]) > 2 and self.Paragraph[i][:2] == '$$':
                        break
                    blogContent += self.Paragraph[i]
                blogContent += '$$\n'
                #outFIle.write('''                </pre>''' + '\n')
                i += 1
            elif lLen > 5 and line[:5] == '#####':
                blogContent += '''                <div class = "h5">''' + line[5 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
                if i + 1 < lLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif lLen > 4 and line[:4] == '####':
                blogContent += '''                <div class = "h4">''' + line[4 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
                if i + 1 < lLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif lLen > 3 and line[:3] == '###':
                blogContent += '''                <div class = "h3">''' + line[3 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
                if i + 1 < lLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif lLen > 2 and line[:2] == '##':
                blogContent += '''                <div class = "h2">''' + line[2 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
                if i + 1 < lLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif lLen > 1 and line[:1] == '#':
                pass
                #outFIle.write('''                <div class = "h1">''' + line[1 : -1] + '''</div>''' + '\n')
                if i + 1 < lLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif lLen > 1 and line[:1] == '>':
                if isQuote:
                    blogContent += '''                <div class = "quoteAgain">''' + line[1 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
                else:
                    blogContent += '''                <div class = "quote">''' + line[1 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
                    isQuote = True
                if i + 1 < lLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif lLen > 3 and line[:3] == 'Tag':
                if i + 1 < lLen and self.Paragraph[i + 1] == '\n':
                    i += 1
            elif lLen > 5 and line[:5] == '[TOC]':
                if i + 1 < lLen and self.Paragraph[i + 1] == '\n':
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
                blogContent += '''                <a href = "%s" class = "conncetion">''' % (href) + context + '''</a>''' + '\n'
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
                blogContent += '''                <img src = "%s" class = "blogImg">''' % (href) + '\n'
            elif line[0] == '\n':
                blogContent += '''                <br>''' + '\n'
            elif len(line) > 3 and line[:3] == '---':
                blogContent += '''                <hr>''' + '\n'
            else:
                blogContent += '                ' + self.getInform(line[:-1]) + '\n'
                blogContent += '''                <br>''' + '\n'
                isQuote = False
            i += 1
        
        blogHtml = blogHtml.replace('((content))', blogContent)
        outFIle.write(blogHtml)

    def main(self):
        #start = input()
        #end = input()
        self.indexFile = open('index.html', 'w')
        homePage = self.homeTemp
        content = ''
        
        for i in range(self.num - 1, -1, -1):
            self.pHtml(i)
            buttonTemp = self.homeBttonTemp
            buttonTemp = buttonTemp.replace('((blogHref))', str(i))
            buttonTemp = buttonTemp.replace('((imgHref))', str(i))
            buttonTemp = buttonTemp.replace('((Title))', self.blogInfo[2][:-1])
            buttonTemp = buttonTemp.replace('((Time))', self.blogInfo[3][:-1])
            buttonTemp = buttonTemp.replace('((brief))', self.blogInfo[0][:-1])
            buttonTemp = buttonTemp.replace('((Tag))', self.blogInfo[1][:-1])
            content += buttonTemp
        
        homePage = homePage.replace('((mainContainer))', content)
        self.indexFile.write(homePage)

if __name__ == '__main__':
    makeHTML().main()