
#include <iostream>
using namespace std;

class Time {
private:
    int hour, minutes;

public:
    void settime(int a, int b) {
        hour = a;
        minutes = b;
    }

    void showtime() {
        cout << "Hours: " << hour << endl;
        cout << "Minutes: " << minutes << endl;
    }

    // Object passing and object returning
    Time sum(Time t) {
        Time t1;

        t1.hour = hour + t.hour;
        t1.minutes = minutes + t.minutes;

        return t1;
    }
};

int main() {
    Time t1, t2, t3;

    t1.settime(10, 20);
    cout<<"Object one: ";
    t1.showtime();

    t2.settime(11, 50);
     cout<<"Object two: ";
    t2.showtime();

    // Object passing and object returning
    t3 = t1.sum(t2);
 cout<<"Object three: ";
    t3.showtime();

    return 0;
}

