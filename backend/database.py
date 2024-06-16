import sqlite3
con = sqlite3.connect("wedding_invitation.sql")
cur = con.cursor()
cur.execute("CREATE TABLE guest_list(firstname, lastname, email, coming, plusone, babychair)")
con.commit()
con.close()
