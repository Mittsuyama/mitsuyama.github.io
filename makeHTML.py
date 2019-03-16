# -*- coding: UTF-8 -*-
import codecs
import os
import glob
from PIL import Image
from algoliasearch import algoliasearch
import datetime

class makeHTML:
    mdFile = None
    tempFile = None
    blogs = None
    blogInfo = []
    Paragraph = []
    indexFile = None
    blogsFile = None
    fileName = []
    homeTemp = []
    homeBttonTemp = []
    blogTemp = []
    num = 0
    client = None
    index = None
    isUpdate = False
    blogTiTle = ''
    blogClass = ''
    blogBrief = ''
    blogTime = ''
    sliderDisplay = [0, 1, 9, 16, 24]
    articleLength = 0
    isEnterList = 0
    monthName = ['壹月', '贰月', '叁月', '肆月', '伍月', '陆月', '柒月', '捌月', '玖月', '拾月', '拾壹月', '拾贰月']
    
    def __init__(self):
        self.blogsFile = open('articles.html', 'w')
        path = 'md/'  #待读取的文件夹
        path_list = os.listdir(path)
        path_list.sort() #对读取的路径进行排序
        for theName in path_list:
        	self.fileName.append(os.path.join(path,theName))
        self.num = len(path_list)
        self.homeTemp = open('templates/newPageTest.html').read()
        self.blogTemp = open('templates/blog.html').read()
        self.blogs = open('templates/articles.html').read()
        self.homeBttonTemp = open('templates/articleDisplay.html').read()
        self.client = algoliasearch.Client("PKH2B42HCE", '3c713b49beef813c568cc0395b171d31')
        self.index = self.client.init_index('MITSUYAMA_SITE')
        print("Push database to Algolia?")
        self.isUpdate = input()

    def getTitle(self, order):
        self.blogInfo = []
        self.Paragraph = []
        self.mdFile = open(self.fileName[order])
        self.tempFile = open(self.fileName[order]).read()
        self.articleLength = len(self.tempFile)
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

        self.blogTiTle = self.blogInfo[0][:-1]
        self.blogClass = self.blogInfo[1][:-1]
        self.blogBrief = self.blogInfo[2][:-1]
        self.blogTime = self.blogInfo[3][:-1].replace('/', '-').replace(' ', '')
        self.mdFile.close()

        tempTime = ''
        if self.blogTime[6] == '-':
            tempTime += self.monthName[int(self.blogTime[5])]
            tempTime += ' '
            tempTime += self.blogTime[7:]
            tempTime += '，'
            tempTime += self.blogTime[:4]
        else:
            tempTime += self.monthName[int(self.blogTime[5:7])]
            tempTime += ' '
            tempTime += self.blogTime[8:]
            tempTime += '，'
            tempTime += self.blogTime[:4]
        
        self.blogTime = tempTime
    
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
        
        listMargin = '';
        if self.isEnterList == 1:
            listMargin = '-12'
        else:
            listMargin = '10'
        if mLen > spaceLen + 2 and myStr[spaceLen : spaceLen + 2] == '- ':
            newS += '''<div class = "normal" style = "margin: %spx 0px 10px 0px; padding-left: %spx; text-indent: -9px;">''' % (listMargin, str(spaceLen * 8 + 35))
            self.isEnterList = 1
            i = spaceLen + 2
            newS += '''<i class = "fa fa-caret-right" style = "top: 3px; margin-right: 3px; font-size: 20px; color: #d94e55"></i>&nbsp'''
        elif mLen > spaceLen + 3 and myStr[spaceLen + 1 : spaceLen + 3] == '. ':
            newS += '''<div class = "normal" style = "margin: %spx 0px 10px 0px; padding-left: %spx; text-indent: -24px;">''' % (listMargin, str(spaceLen * 8 + 40))
            self.isEnterList = 1
            i = spaceLen + 3
            newS += '''<span style = "color: #d94e55">%s.&nbsp&nbsp</span>''' % (myStr[spaceLen])
        elif mLen > spaceLen + 4 and myStr[spaceLen + 2 : spaceLen + 4] == '. ':
            newS += '''<div class = "normal" style = "margin: %spx 0px 10px 0px; padding-left: %spx; text-indent:-24px;">''' % (listMargin, str(spaceLen * 8 + 40))
            self.isEnterList = 1
            i = spaceLen + 4
            newS += '''<span style = "color: #d94e55">%s.&nbsp&nbsp</span>''' % (myStr[spaceLen : spaceLen + 2])
        else:
            newS += '''<div class = "normal">'''
            self.isEnterList = 0

        isMath = 0
        while i < mLen:
            ch = myStr[i]
            if ch == ' ':
                newS += ' '
            elif ch == '$':
                isMath = 1 - isMath
                newS += '$'
            elif ch == '*' and isMath == 0:
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
            elif isMath == 0 and ch == '<' and i + 2 < mLen and myStr[i + 1] == 'u' and myStr[i + 2] == '>':
                newS += '''<span class = "underline">'''
                i += 2
            elif isMath == 0 and ch == '<' and i + 3 < mLen and myStr[i + 1] == '/' and myStr[i + 2] == 'u' and myStr[i + 3] == '>':
                newS += '''</span>'''
                i += 3
            elif isMath == 0 and ch == '`':
                if isEmphasis == False:
                    newS += '''<span class = "emphasis">'''
                    isEmphasis = True
                else:
                    newS += '''</span>'''
                    isEmphasis = False
            elif isMath == 0 and ch == '~'  and i + 1 < mLen and myStr[i + 1] == '~':
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
        
        newS += '''</div>'''
        return newS

            

    def pHtml(self, order):
        self.getTitle(order)

        #Make blog page
        outFIle = open('blog/' + str(order) + '.html', 'w')
        blogHtml = self.blogTemp
        blogHtml = blogHtml.replace('((siteTitle))', self.blogTiTle)
        blogHtml = blogHtml.replace('((Title))', self.blogTiTle)
        blogHtml = blogHtml.replace('((Time))', self.blogTime)
        blogHtml = blogHtml.replace('((Tag))', self.blogClass)
        blogHtml = blogHtml.replace('((blogTitleImg))', str(order))
        blogHtml = blogHtml.replace('((pageUrl))', "http://www.mitsuyama.top/blog/" + str(order) + ".html")
        blogHtml = blogHtml.replace('((pageId))', "blog" + str(order))
        blogHtml = blogHtml.replace('((lastBlog))', str(order - 1))
        if order == self.num - 1:
            blogHtml = blogHtml.replace('((nextBlog))', str(-1))
        else:
            blogHtml = blogHtml.replace('((nextBlog))', str(order + 1))
        blogContent = ''

        contentAll = ''
        tempOrder = 0
        contentList = ''
        for j in self.Paragraph:
            if len(j) > 6 and j[:5] == '#####':
                contentAll = contentAll + j[6:-1] + ','
            elif len(j) > 5 and j[:4] == '####':
                contentAll = contentAll + j[5:-1] + ','
                tempOrder += 1
                #contentList += '''           <a href = "#%s" class = "contentListCon" style = "padding-left: 80px;">''' % (str(tempOrder)) + j[5:-1].replace(' ', '&nbsp&nbsp') + '''</a><br>''' + '\n'
            elif len(j) > 4 and j[:3] == '###':
                contentAll = contentAll + j[4:-1] + ','
                tempOrder += 1
                contentList += '''            <a href = "#%s" class = "contentListCon" style = "padding-left: 40px; color: rgba(0, 0, 0, 0.5);">''' % (str(tempOrder)) + j[4:-1].replace(' ', '&nbsp&nbsp') + '''</a>''' + '\n'
            elif len(j) > 3 and j[:2] == '##':
                contentAll = contentAll + j[3:-1] + ','
                tempOrder += 1
                contentList += '''            <a href = "#%s" class = "contentListCon" style = "color: rgba(0, 0, 0, 0.5); font-weight: bold;">''' % (str(tempOrder)) + j[3:-1].replace(' ', '&nbsp&nbsp') + '''</a>''' + '\n'
        if(tempOrder > 0):
            blogHtml = blogHtml.replace('((contentList))', contentList)
        else:
            contentList += '''            <a href = "#" class = "contentListCon">无目录...</a>\n'''
            blogHtml = blogHtml.replace('((contentList))', contentList)

        #update search data
        if self.isUpdate == '1':

            print(self.fileName[order])
            #print(contentAll)
            #print('over')
            htmlContent = self.tempFile
            htmlContent = htmlContent.replace('**', ' ')
            htmlContent = htmlContent.replace('<u>', ' ')
            htmlContent = htmlContent.replace('</u>', ' ')
            htmlContent = htmlContent.replace('*', ' ')
            htmlContent = htmlContent.replace('#####', ' ')
            htmlContent = htmlContent.replace('####', ' ')
            htmlContent = htmlContent.replace('###', ' ')
            htmlContent = htmlContent.replace('##', ' ')
            htmlContent = htmlContent.replace('#', ' ')
            htmlContent = htmlContent.replace('~~', ' ')
            htmlContent = htmlContent.replace('$$', ' ')
            htmlContent = htmlContent.replace('$', ' ')
            htmlContent = htmlContent.replace('\n', ' ')
            if len(htmlContent) > 1000 and len(contentAll) > 400:
                self.index.add_object(
                    {"url": str(order), "title": self.blogInfo[0], "time": self.blogInfo[3].replace(' ', '').replace('/', '-'), "tag": self.blogInfo[1], "brief": self.blogInfo[2][:-1], "content": contentAll[:1000]},
                    str(order)
                )
            else:
                self.index.add_object(
                    {"url": str(order), "title": self.blogInfo[0], "time": self.blogInfo[3].replace(' ', '').replace('/', '-'), "tag": self.blogInfo[1], "brief": self.blogInfo[2][:-1], "content": htmlContent[:1000]},
                    str(order)
                )

        isQuote = False
        pLen = len(self.Paragraph)
        i = 5
        tempOrder = 0
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
            elif lLen > 2 and line[:2] == '$$':
                #outFIle.write('''                <pre class = "codeBlock">''' + '\n')
                # if self.Paragraph[i - 1][0] != '\n':
                #     blogContent += '''<br>'''
                blogContent += '$$\n'
                while True:
                    i += 1
                    if len(self.Paragraph[i]) > 2 and self.Paragraph[i][:2] == '$$':
                        break
                    blogContent += self.Paragraph[i]
                blogContent += '$$\n'
                # if i < pLen - 1 and self.Paragraph[i + 1][0] != '\n':
                #     blogContent += '''<br>'''
                #outFIle.write('''                </pre>''' + '\n')
            elif lLen > 5 and line[:5] == '#####':
                blogContent += '''                <div class = "h5">''' + line[6 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
            elif lLen > 4 and line[:4] == '####':
                tempOrder += 1
                blogContent += '''                <div class = "h4" id = "%s">''' % (tempOrder) + line[5 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
            elif lLen > 3 and line[:3] == '###':
                tempOrder += 1
                blogContent += '''                <div class = "h3" id = "%s">''' % (tempOrder) + line[4 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
            elif lLen > 2 and line[:2] == '##':
                tempOrder += 1
                blogContent += '''                <div class = "h2" id = "%s">''' %(tempOrder) + line[3 : -1].replace(' ', '&nbsp&nbsp') + '''</div><div id = "hUnderline"></div>''' + '\n'
            elif lLen > 1 and line[:1] == '#':
                pass
                #outFIle.write('''                <div class = "h1">''' + line[1 : -1] + '''</div>''' + '\n')
            elif lLen > 1 and line[:1] == '>':
                if isQuote:
                    blogContent += '''                <div class = "quoteAgain">''' + line[2 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
                else:
                    blogContent += '''                <div class = "quote"><i class = "fa fa-quote-left fa-1x fa-pull-left" aria-hidden = "true" id = "quoteIcon"></i>''' + line[2 : -1].replace(' ', '&nbsp&nbsp') + '''</div>''' + '\n'
                    isQuote = True
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
                blogContent += '''                <a href = "%s" class = "conncetion"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp&nbsp&nbsp''' % (href) + context + '''</a>''' + '\n'
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
                blogContent += '''                <img src = "%s" class = "blogImg"><br>''' % (href) + '\n'
            elif line[0] == '\n':
                if self.Paragraph[i - 1][0] == '\n' and self.Paragraph[i - 2][0] != '\n':
                    blogContent += '''                <br>''' + '\n'
            elif len(line) > 3 and line[:3] == '---':
                blogContent += '''                <hr>''' + '\n'
            else:
                blogContent += '                ' + self.getInform(line[:-1]) + '\n'
                #blogContent += '''                <br>''' + '\n'
                isQuote = False
            i += 1
        
        blogHtml = blogHtml.replace('((content))', blogContent)
        outFIle.write(blogHtml)

    def main(self):
        self.indexFile = open('index.html', 'w')
        
        homePage = self.homeTemp
        content = ''

        homePage = homePage.replace('((blogNumber))', str(self.num))
        homePage = homePage.replace('((blogDays))', str((datetime.datetime.now() - datetime.datetime(2018, 10, 1)).days))

        homePage = homePage.replace('order0', str(self.sliderDisplay[0])).replace('order1', str(self.sliderDisplay[1])).replace('order2', str(self.sliderDisplay[2])).replace('order3', str(self.sliderDisplay[3])).replace('order4', str(self.sliderDisplay[4]))

        #homePage = homePage.replace('orderb0', 'b' + str(self.sliderDisplay[0])).replace('orderb1', 'b' + str(self.sliderDisplay[1])).replace('orderb2', 'b' + str(self.sliderDisplay[2])).replace('orderb3', 'b' + str(self.sliderDisplay[3])).replace('orderb4', 'b' + str(self.sliderDisplay[4]))

        blogBox = '''
                <a href = "blog/((order)).html">
                    <div class = "box">
                        <div class = "blogTitle">
                            ((title))
                            <div class = "selectLine"></div>
                        </div>
                        <div class = "titleRight"></div>
                        <div class = "blogBrieft">
                            ((short))
                        </div>
                        <div class = "blogOther">
                            ((time))&nbsp•&nbsp((tag))
                        </div>
                    </div>
                </a>
        
                <div class = "cuttingLine"></div>
        '''
        blogBoxs = ''

        for i in range(self.num - 1, -1, -1):
            self.pHtml(i)
            for j in range(0, 5):
                if i == self.sliderDisplay[j]:
                    homePage = homePage.replace('((sliderTime' + str(j) + '))', self.blogTime)
                    homePage = homePage.replace('((slierTitle' + str(j) + '))', self.blogTiTle)
                    homePage = homePage.replace('((sliderBrief' + str(j) + '))', self.blogBrief)

            buttonTemp = self.homeBttonTemp
            buttonTemp = buttonTemp.replace('((order))', str(i))
            buttonTemp = buttonTemp.replace('((title))', self.blogTiTle)
            buttonTemp = buttonTemp.replace('((time))', self.blogTime)
            buttonTemp = buttonTemp.replace('((brief))', self.blogBrief)
            buttonTemp = buttonTemp.replace('((number))', str(self.articleLength))
            buttonTemp = buttonTemp.replace('((tag))', str(self.blogClass))
            
            #if self.num - i <= 3:
            content += buttonTemp

            tempBlogBox = blogBox
            tempBlogBox = tempBlogBox.replace('((order))', str(i))
            tempBlogBox = tempBlogBox.replace('((title))', self.blogTiTle)
            tempBlogBox = tempBlogBox.replace('((short))', self.tempFile[:min(250, self.articleLength)].replace('#', '').replace('$', '').replace('*', '').replace('<u>', '').replace('</u>', '') + '...')
            tempBlogBox = tempBlogBox.replace('((time))', self.blogTime)
            tempBlogBox = tempBlogBox.replace('((tag))', self.blogClass)
            blogBoxs += tempBlogBox
        #end
        
        self.blogs = self.blogs.replace('((allBLogs))', blogBoxs)
        homePage = homePage.replace('((articleBoxs))', content)
        self.indexFile.write(homePage)
        self.blogsFile.write(self.blogs)

if __name__ == '__main__':
    makeHTML().main()
